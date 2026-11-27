// FretLab desktop launcher.
//
// Serves the FretLab site from a "site" folder on 127.0.0.1 only (never on the network) and opens it in your browser.
// Everything works offline. The program stops by itself a few minutes after the last FretLab browser tab is closed.
//
// Copyright (C) 2026 the FretLab authors. Licensed under the GNU General Public License, version 3 or later.
package main

import (
	"bytes"
	"flag"
	"fmt"
	"io"
	"mime"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"runtime"
	"strings"
	"sync/atomic"
	"time"
)

const (
	version       = "12"
	preferredPort = 47831 // fixed so the browser keeps your saved settings between runs (they are stored per address)
	signature     = "fretlab-desktop"
)

// The page pings the launcher every few seconds; when the pings stop, the launcher quits.
const heartbeat = `<script>/*fl-desktop*/(function(){function p(){try{fetch('/__ping',{cache:'no-store'}).catch(function(){})}catch(e){}}p();setInterval(p,5000)})()</script>`

var lastPing atomic.Int64 // unix nanoseconds of the last ping; 0 = none yet

func siteDir() (string, error) {
	var tried []string
	if d := os.Getenv("FRETLAB_SITE"); d != "" {
		tried = append(tried, d)
	}
	if exe, err := os.Executable(); err == nil {
		if r, err := filepath.EvalSymlinks(exe); err == nil {
			exe = r
		}
		dir := filepath.Dir(exe)
		tried = append(tried, filepath.Join(dir, "site"), filepath.Join(dir, "..", "Resources", "site"), filepath.Join(dir, "..", "site"))
	}
	if wd, err := os.Getwd(); err == nil {
		tried = append(tried, filepath.Join(wd, "site"))
	}
	for _, d := range tried {
		if st, err := os.Stat(filepath.Join(d, "index.html")); err == nil && !st.IsDir() {
			return d, nil
		}
	}
	return "", fmt.Errorf("could not find the FretLab site folder (looked in: %s)", strings.Join(tried, ", "))
}

func openBrowser(url string) {
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "windows":
		cmd = exec.Command("rundll32", "url.dll,FileProtocolHandler", url)
	case "darwin":
		cmd = exec.Command("open", url)
	default:
		cmd = exec.Command("xdg-open", url)
	}
	if err := cmd.Start(); err != nil {
		fmt.Fprintln(os.Stderr, "Could not open a browser automatically. Open this address yourself:", url)
		return
	}
	go cmd.Wait()
}

// alreadyRunning reports whether a FretLab launcher is already answering on the preferred port.
func alreadyRunning(port int) bool {
	c := http.Client{Timeout: 700 * time.Millisecond}
	resp, err := c.Get(fmt.Sprintf("http://127.0.0.1:%d/__fretlab", port))
	if err != nil {
		return false
	}
	defer resp.Body.Close()
	b, _ := io.ReadAll(io.LimitReader(resp.Body, 64))
	return strings.TrimSpace(string(b)) == signature
}

func handler(root string) http.Handler {
	fs := http.Dir(root)
	files := http.FileServer(fs)
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case "/__ping":
			lastPing.Store(time.Now().UnixNano())
			w.Header().Set("Cache-Control", "no-store")
			w.WriteHeader(http.StatusNoContent)
			return
		case "/__fretlab":
			w.Header().Set("Cache-Control", "no-store")
			fmt.Fprint(w, signature)
			return
		}
		if r.Method != http.MethodGet && r.Method != http.MethodHead {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}
		p := path.Clean("/" + r.URL.Path)
		if strings.HasSuffix(r.URL.Path, "/") || strings.HasSuffix(p, ".html") {
			name := p
			if strings.HasSuffix(r.URL.Path, "/") {
				name = path.Join(p, "index.html")
			}
			f, err := fs.Open(name)
			if err == nil {
				defer f.Close()
				if st, err := f.Stat(); err == nil && !st.IsDir() {
					data, err := io.ReadAll(f)
					if err == nil {
						if i := bytes.Index(data, []byte("</head>")); i >= 0 {
							data = append(data[:i:i], append([]byte(heartbeat), data[i:]...)...)
						}
						w.Header().Set("Content-Type", "text/html; charset=utf-8")
						w.Header().Set("Cache-Control", "no-cache")
						w.Header().Set("Content-Length", fmt.Sprint(len(data)))
						if r.Method != http.MethodHead {
							w.Write(data)
						}
						return
					}
				}
			}
		}
		if p == "/sw.js" || strings.HasSuffix(p, ".webmanifest") {
			w.Header().Set("Cache-Control", "no-cache")
		}
		files.ServeHTTP(w, r)
	})
}

func main() {
	noBrowser := flag.Bool("no-browser", false, "do not open a browser")
	port := flag.Int("port", preferredPort, "port to listen on (127.0.0.1 only)")
	showVersion := flag.Bool("version", false, "print the version and exit")
	flag.Parse()
	if *showVersion {
		fmt.Println("FretLab", version)
		return
	}
	for ext, t := range map[string]string{".webmanifest": "application/manifest+json", ".js": "text/javascript; charset=utf-8", ".woff": "font/woff", ".mjs": "text/javascript; charset=utf-8"} {
		mime.AddExtensionType(ext, t)
	}
	root, err := siteDir()
	if err != nil {
		fmt.Fprintln(os.Stderr, "FretLab:", err)
		os.Exit(1)
	}
	ln, err := net.Listen("tcp", fmt.Sprintf("127.0.0.1:%d", *port))
	if err != nil {
		if alreadyRunning(*port) { // second launch: just show the running copy
			if !*noBrowser {
				openBrowser(fmt.Sprintf("http://127.0.0.1:%d/", *port))
			}
			return
		}
		if ln, err = net.Listen("tcp", "127.0.0.1:0"); err != nil {
			fmt.Fprintln(os.Stderr, "FretLab: cannot start the local server:", err)
			os.Exit(1)
		}
	}
	url := fmt.Sprintf("http://%s/", ln.Addr().String())
	fmt.Println("FretLab", version, "is running at", url)

	idle := 3 * time.Minute // tabs in the background only ping about once a minute
	if v := os.Getenv("FRETLAB_IDLE"); v != "" {
		if d, err := time.ParseDuration(v); err == nil {
			idle = d
		}
	}
	started := time.Now()
	go func() {
		for range time.Tick(2 * time.Second) {
			lp := lastPing.Load()
			if lp == 0 {
				if time.Since(started) > 10*time.Minute { // nobody ever connected
					os.Exit(0)
				}
				continue
			}
			if time.Since(time.Unix(0, lp)) > idle {
				os.Exit(0)
			}
		}
	}()
	if !*noBrowser {
		openBrowser(url)
	}
	srv := &http.Server{Handler: handler(root), ReadHeaderTimeout: 10 * time.Second}
	if err := srv.Serve(ln); err != nil {
		fmt.Fprintln(os.Stderr, "FretLab:", err)
		os.Exit(1)
	}
}

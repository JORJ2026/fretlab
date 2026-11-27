package com.fretlab.app;

import android.Manifest;
import android.app.Activity;
import android.content.ContentValues;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.widget.Toast;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Bundle;
import android.webkit.MimeTypeMap;
import android.webkit.PermissionRequest;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    /** The app's pages are served from the bundled assets under this fixed https address (no network is ever used). */
    private static final String HOST = "appassets.androidplatform.net";
    private static final String HOME = "https://" + HOST + "/fretlab.html";
    private WebView web;
    private PermissionRequest pending;

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        getWindow().setStatusBarColor(Color.parseColor("#15120F"));
        getWindow().setNavigationBarColor(Color.parseColor("#15120F"));
        web = new WebView(this);
        web.setBackgroundColor(Color.parseColor("#15120F"));
        setContentView(web);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setAllowFileAccess(false);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setSupportZoom(false);
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView v, String url) {
                return !url.startsWith("https://" + HOST + "/");
            }

            @Override
            public WebResourceResponse shouldInterceptRequest(WebView v, WebResourceRequest req) {
                Uri u = req.getUrl();
                if (!HOST.equals(u.getHost())) return reply(403, "text/plain", null);
                String path = u.getPath() == null ? "" : u.getPath();
                while (path.startsWith("/")) path = path.substring(1);
                if (path.isEmpty()) path = "fretlab.html";
                if (path.contains("..")) return reply(403, "text/plain", null);
                try {
                    InputStream in = getAssets().open(path);
                    String ext = MimeTypeMap.getFileExtensionFromUrl(path);
                    String type = ext == null || ext.isEmpty() ? null : MimeTypeMap.getSingleton().getMimeTypeFromExtension(ext.toLowerCase());
                    if (type == null) type = "application/octet-stream";
                    if ("js".equals(ext)) type = "text/javascript";
                    return reply(200, type, in);
                } catch (IOException e) {
                    return reply(404, "text/plain", null);
                }
            }
        });
        // Lets the tuner ask for the microphone (only the bundled page can; the app has no INTERNET permission).
        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(final PermissionRequest req) {
                runOnUiThread(() -> {
                    if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED) {
                        req.grant(req.getResources());
                    } else {
                        pending = req;
                        requestPermissions(new String[]{Manifest.permission.RECORD_AUDIO}, 7);
                    }
                });
            }
        });
        // Exports: a WebView cannot save blob: downloads or print, so the page hands them to the app.
        web.addJavascriptInterface(new Object() {
            @JavascriptInterface
            public String saveFile(String name, String mime, String b64) { return saveDownload(name, mime, b64); }
            @JavascriptInterface
            public void printPage() {
                runOnUiThread(() -> {
                    try {
                        android.print.PrintManager pm = (android.print.PrintManager) getSystemService(android.content.Context.PRINT_SERVICE);
                        if (pm != null) pm.print("ManicRulesGuitar", web.createPrintDocumentAdapter("ManicRulesGuitar"), null);
                    } catch (Exception e) { Toast.makeText(MainActivity.this, "Printing is not available", Toast.LENGTH_LONG).show(); }
                });
            }
        }, "JackRoseGuitarAndroid");
        if (state == null) web.loadUrl(HOME);
        else web.restoreState(state);
    }

    @Override
    public void onRequestPermissionsResult(int code, String[] perms, int[] results) {
        super.onRequestPermissionsResult(code, perms, results);
        if (code == 7 && pending != null) {
            if (results.length > 0 && results[0] == PackageManager.PERMISSION_GRANTED) pending.grant(pending.getResources());
            else pending.deny();
            pending = null;
        }
    }

    private static WebResourceResponse reply(int code, String type, InputStream body) {
        boolean text = type.startsWith("text/") || type.contains("json");
        WebResourceResponse r = new WebResourceResponse(type, text ? "utf-8" : null, code, code == 200 ? "OK" : (code == 404 ? "Not Found" : "Forbidden"), new java.util.HashMap<String, String>(), body != null ? body : new ByteArrayInputStream(new byte[0]));
        return r;
    }

    @Override protected void onSaveInstanceState(Bundle out) { super.onSaveInstanceState(out); web.saveState(out); }
    @Override protected void onPause() { super.onPause(); web.onPause(); }
    @Override protected void onResume() { super.onResume(); web.onResume(); }

    /** Saves an export to Downloads/ManicRulesGuitar (Android 10+) or the app's own Download folder, and opens PDFs. */
    private String saveDownload(String name, String mime, String b64) {
        try {
            byte[] data = Base64.decode(b64, Base64.DEFAULT);
            String safe = (name == null || name.isEmpty() ? "manicrulesguitar-export" : name).replaceAll("[\\\\/:*?\"<>|]", "_");
            String type = (mime == null || mime.isEmpty()) ? "application/octet-stream" : mime;
            Uri uri = null;
            String where;
            if (Build.VERSION.SDK_INT >= 29) {
                ContentValues cv = new ContentValues();
                cv.put(MediaStore.MediaColumns.DISPLAY_NAME, safe);
                cv.put(MediaStore.MediaColumns.MIME_TYPE, type);
                cv.put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS + "/ManicRulesGuitar");
                uri = getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, cv);
                if (uri == null) throw new IOException("could not create the file");
                try (OutputStream os = getContentResolver().openOutputStream(uri)) { os.write(data); }
                where = "Downloads/ManicRulesGuitar/" + safe;
            } else {
                File dir = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS);
                if (dir == null) dir = getFilesDir();
                File f = new File(dir, safe);
                try (FileOutputStream os = new FileOutputStream(f)) { os.write(data); }
                where = f.getAbsolutePath();
            }
            final Uri open = uri;
            final String msg = "Saved: " + where;
            final boolean pdf = safe.toLowerCase().endsWith(".pdf");
            runOnUiThread(() -> {
                Toast.makeText(MainActivity.this, msg, Toast.LENGTH_LONG).show();
                if (open != null && pdf) {
                    try {
                        Intent i = new Intent(Intent.ACTION_VIEW);
                        i.setDataAndType(open, "application/pdf");
                        i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
                        startActivity(i);
                    } catch (Exception e) { /* no PDF viewer installed – the file is still in Downloads */ }
                }
            });
            return "ok";
        } catch (Exception e) {
            return "error: " + e.getMessage();
        }
    }
}

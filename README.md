# FretLab 10.6 – Original + Beta

An offline fretboard app for guitar, bass, banjo, mandolin, ukulele, violin, viola and cello. Opening the site asks
which version to use:

* **Original** – the full original site (`original/`), with its Navigate menu, Controls, Export Studio, lessons, courses and quizzes.
* **New Beta – FretLab 10.6** (`beta/index.html`, one self-contained file):
  * **Lessons mode**: 2,223 interactive guitar lessons in 41 units, from absolute basics to advanced, in a separate uncluttered view (`beta/index.html#lessons`, or `#lesson-12` for one lesson);
  * **Video mode**: animates the current scale, chord, interval, progression, marked notes, quiz question or song with a title, and exports GIF, MP4 or FLV (16:9, square or vertical);
  * **Game mode**: 100 games for notes, intervals, chords, scales, modes, keys and ear training (`beta/index.html#games`);
  * **My library**: make your own scales, chords, progressions, strumming patterns and drum grooves; they appear in the menus;
  * **Strings & ranges**: 1 to 32 strings, and a first/last fret for each string;
  * **End on root chord** after a scale;
  * videos with sound (MP4 and FLV);
  * Roboto typeface built in; every section but the fretboard starts collapsed;
  * a ■ Stop button that appears whenever anything is playing;
  * 59 drum grooves (50 new: rock, funk, hip-hop, Latin, Afro-Caribbean, jazz, 6/8, metal…) and 1,745 progressions;
  * opens MIDI, Guitar Pro (3, 4, 5, 6 and 7/8) and Power Tab 1.7 files, plays them on the neck and converts between formats;
  * progressions in 18 categories (Andalusian, flamenco, blues, jazz chains, modal and more) that export to MIDI, Guitar Pro and Power Tab;
  * 100 strumming patterns with a metronome and count-in;
  * a tab under the diagram that follows the position you choose;
  * a calm, simple view with a one-octave tab under the diagram;
  * 13 instruments, including a fretless view for violin, viola and cello;
  * PDF study packages with the related intervals, chords and scales;
  * tab export to ASCII, MIDI, Guitar Pro 5 and Power Tab;
  * a Chopin MIDI library that plays on the neck in treble and bass parts.

Everything works without an internet connection.

## Publish on GitHub Pages

1. Create a repository and upload everything in this folder, including the hidden `.nojekyll` file.
2. In *Settings → Pages*, choose **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Open `https://<user>.github.io/<repo>/`. After one visit the whole site (both modes) is saved for offline use.
   The chooser page says **✓ Ready to work offline** when it's done.

No build step is needed. Any static host works the same way (Netlify, Cloudflare Pages, your own server).

## Downloads for other platforms

`downloads.html` links to the packages in `downloads/`:

| File | What it is |
|---|---|
| `FretLab-10.6-Windows.zip` | `FretLab.exe` (x64) and `FretLab-arm64.exe`, an installer `.bat` and the site |
| `FretLab-10.6-Mac.zip` | `FretLab.app` for Apple Silicon and Intel, plus an installer |
| `FretLab-10.6-Linux.zip` | x64 and ARM64 binaries, plus `install-linux.sh` for a menu entry |
| `FretLab-10.6-Android-Project.zip` | Android Studio project; the app has no INTERNET permission |
| `FretLab-10.6-Beta.html` | The Beta as one HTML file that opens straight from disk |

The desktop apps serve the bundled site on `127.0.0.1` only and open your browser, so both modes work fully offline.
iPhone and iPad: open the site in Safari, then choose *Share → Add to Home Screen*.

## Run locally without installing

* Beta: open `beta/index.html` directly.
* Both modes: run `python3 -m http.server 8000` in this folder, then open `http://localhost:8000/`.

## Notes

* The Guitar Pro (`.gp5`, format 5.00) and Power Tab (`.ptb`, Power Tab Editor 1.7) files are written from the published
  file layouts and checked with independent readers. They have not been opened in Guitar Pro or Power Tab Editor here.
  Power Tab files open at that program's default tempo.
* The MIDI library holds 79 Chopin piano pieces. When a piece is played on the neck:
  * notes outside the instrument's range move to the nearest playable octave;
  * the right and left hands become separate treble and bass parts;
  * notes beyond the number of strings are left out.


## Help

`FretLab-Guide.pdf` (in this folder, and linked from the start page and the Beta's ❔ Guide button) explains every feature, with screenshots and installation steps for each platform.

## Fonts

Roboto is included under the SIL Open Font License (`Roboto-OFL.txt`).

## Launch notes (10.4)
* In the Beta press **Shift+I** for About: privacy, licences, diagnostics, self-test, backup and reset.
* `beta/index.html?safe=1` starts with factory settings and does not read or write saved data.
* See `PUBLISHING.md`, `LAUNCH-CHECKLIST.md`, `CHANGELOG.md`, `privacy.html` and `THIRD-PARTY-NOTICES.txt`.
* **10.5:** the 🧪 Lab (header button or **Shift+L**) has 44 extra theory, sound and practice tools; `beta/index.html?lab=ivec` opens a tool directly.
* **10.6:** a guided demo (▶ Demo in the header, **Shift+D**, or `beta/index.html?demo=1`) walks through every section, mode, tool and Lab tool with what / how / when text; `?kiosk=1` loops it for a display; `FEATURES.md` and `feature-reference.html` hold the same text.
* **10.7:** 100 polishes (touch targets, safe areas, accessibility, data safety, small behaviours – listed in the Beta's About › Polish & preferences) and a features landing page: `features.html` on the site and `beta/index.html?home=1` (or **Shift+H**) in the app, with one button per feature; `?feature=<id>` opens one feature directly.
* **10.8:** the default volume is 30% lower (56%, was 80%; anyone still on the old default is lowered once). Export Studio › Page now has **Diagrams per page**, **Diagram size** and an **Auto** orientation, alongside paper size and portrait/landscape.
* **10.9:** scale/interval/lesson playback is scheduled on the audio clock (even timing); 2,123 more lessons (214 in 41 units, including one on every interval, chord type, scale and chord progression); a **Finger drill** (🖐 Drill, `beta/index.html#drill`) with random 8-measure patterns of fingers 1–4.

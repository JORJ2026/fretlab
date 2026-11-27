# Launch checklist

Done by the build and tested in a desktop Chrome test browser: self-test, offline caching, safe mode, reset, dialogs and accessibility basics.

**Still to do by a person (cannot be checked from the build machine):**
- [ ] Open the Beta and Original on a real iPhone/iPad (Safari) and an Android phone (Chrome): sound after the first tap, install to Home Screen, fretboard taps.
- [ ] Install the Windows, Mac and Linux packages on real machines.
- [ ] Install and run the Android project build (Android Studio) on a device; try Save and Print.
- [ ] Record a video in MP4 and FLV and play it in the players your audience uses (AAC audio is the least-tested part).
- [ ] Open a few real Guitar Pro and Power Tab files (the importers were tested on files made by FretLab).
- [x] Licence chosen: GPL-3.0-or-later (`LICENSE`). Optionally put your own name in the copyright line of README.md and add a contact address for problem reports.
- [x] `sitemap.xml` added – check that the address in it (jorj2026.github.io/fretlab) is your real one.
- [ ] Ask two or three people to try a first-time visit with the Quick tour.
- [ ] Run the guided demo (Shift+D) once on a phone and once on a desktop; check the card is readable and Esc / Exit restores your settings.
- [ ] Try `beta/index.html?kiosk=1` on the screen you plan to use for a display.
- [ ] In About › Diagnostics press Launch check and confirm every line has a tick.
- [ ] Open `features.html` on a phone and tap a few buttons; each should open that feature in the Beta with its note.
- [ ] In the Beta, About › Polish & preferences › Run the polish checks; all should pass on your device.
- [ ] Export Studio › Page: try 6 per page in landscape and export a PDF; check the page size and count match the summary line.

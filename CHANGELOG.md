# FretLab changelog

## 11 – Jam Band 5, page ports, Export Hub

* 38 site pages ported into the Beta as sections (lessons, scales, chords, Theory Decks, More pages, Export Studio and more).
* Jam Band 5: 100 live options in 9 groups; effects now apply to exports.
* 📤 Export Hub: MIDI, Guitar Pro, Power Tab, ASCII tab, Word, PDF, PNG, SVG and video for every instrument, plus "export everything".
* 🔄 Reset all button; bass neck opens with the fretboard; every progression is a demo-jam playlist.
* Default fret window: frets 0–4 on every string except the 3rd (0–3); ↔️ All frets / 🎯 Open position toggle.
* Tempo range 20–400 BPM; query strings and ES modules work in embedded pages.

## 10.9 – scale timing, 2,123 more lessons, finger drill
Scale, interval and lesson-example playback is now scheduled on the audio clock with the sounds prepared in advance, so notes are evenly spaced even when the page is busy and loops restart without a gap (measured: spacing varied by up to ~80 ms before, now exact). 2,123 more full lessons (101–2223, including one on every interval, chord type, scale and chord progression) in eleven new units (the last, Intervals one by one, has a lesson on every interval from unison to octave plus a review): Chord colours, Rhythm styles, Fretboard mastery, Ear training, Lead playing II, Rock/metal/funk, Blues/jazz/country, Fingerstyle II, Songwriting and arranging, Theory/practice/your guitar – every lesson has playable examples and check questions. New **Finger drill** (🖐 Drill, or `#drill`): 8 measures of random 2-, 3- or 4-note patterns of fingers 1–4 in any order (all 60 orderings), the same on every string or different on each, with neck, tab, tempo and repeats.

## 10.8 – volume and Export Studio layout
Default master volume lowered by 30% (0.8 → 0.56); a one-time migration lowers it for people still on the old default, and the slider now moves in 1% steps. Export Studio › Page: choose diagrams per page (1–24 or custom columns × rows), diagram size (30–100%), paper size and orientation (portrait, landscape or auto), with a live summary of how many fit and how many pages result. PDF, page images, print, preview, Word and HTML follow the choices.

## 10.7 – polish and features page
A features landing page with one button per feature (189): in the app (🏠 Features, Shift+H, ?home=1, ?feature=<id>) and on the site (features.html). 100 polishes, each with an automated check (About › Polish & preferences › Run the polish checks): larger touch targets, no double-tap zoom delay, safe-area padding, dialogs that lock the page behind them, section open/closed state for screen readers, number keypad for number boxes, forced-colours and more-contrast styling, calm-motion setting, stop sound when the tab is hidden, offline/online messages, toast de-duplication, screen kept awake during auto-play, focus returned after the demo, / to search, skip-to-controls link, clearer storage-full message, value clamping and cleanup of saved data, and more.

## 10.6 – launch and demo
Guided demo mode (Shift+D, ▶ Demo, ?demo=1, ?kiosk=1) with 189 steps: each says what a feature is, how to use it and when, while the real feature runs and is highlighted. Auto-play, read aloud, contents with search, per-section ⓘ buttons, try-it-yourself pause, exact restore of your settings on exit, feature reference (Markdown, print, copy). Launch extras: getting-started checklist, automatic backups with restore, errors kept between sessions, launch check, performance figures, version history, private usage counts, shortcut search, hints setting, backup reminder, offline badge. Site: FEATURES.md, feature-reference.html, demo link and manifest shortcut.

## 10.5 – the Lab
A new 🧪 Lab (header button or Shift+L) with 44 tools: interval vector, pitch-class sets, symmetry, nearest scales, scales containing a chord, chord-scale advisor, negative harmony, pivot chords, secondary dominants, tritone substitution, guide tones, voice-leading distance, scale spelling in all keys, inversions, slash-chord namer, step formulas, chord-from-frets, tuning finder and comparer, Nashville converter, chord-symbol translator; harmonic series, natural harmonics, equal vs just intonation, beat frequency, wavelength, delay times, metric modulation, string tension, fanned frets, nut spacing; finger permutations, scale sequences, practice roulette, random melodies, rhythm patterns, polyrhythm trainer, practice timer, practice calendar, weekly goal; chord-sheet transposer / ChordPro, bar-chart formatter, song-structure planner and setlist builder. Workspace: search, pins, recent results, copy, save as text, play, show on the fretboard, Shift+L, ?lab=tool deep link.

## 10.4 – launch preparation
About / Privacy / Licences / Terms / Troubleshooting dialog (Shift+I), diagnostics, error catching, self-test, audio test, storage tools, reset, safe mode (`?safe=1`), update check, quick tour, share / copy link, text size, accessibility improvements (dialog focus handling, skip link, automatic button names, stronger focus outline), page title follows the mode, search/social tags, `noscript` message. Site: 404 page, privacy page, third-party notices, robots.txt, favicon.ico, publishing guide, launch checklist, richer web manifest.

## 10.3
Collapsible header (collapsed by default, H key), working instrument quick-switch, tuning ⇄ instrument sync, Install button.

## 10.2
100 bug fixes, Roboto typeface, Android file saving and printing, play-root-chord after scales.

## 10.1
Per-string fret ranges and up to 32 strings, user library (scales, chords, progressions, strumming and drum patterns), video with sound, collapsed-by-default sections, 100 games, 100 lessons, complete how-to guide PDF.

## Earlier
10.0 and before: the original fretboard, chords, scales, intervals, quizzes and export features.

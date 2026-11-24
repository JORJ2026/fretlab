# Publishing FretLab

## GitHub Pages
1. Create a repository and upload **the contents** of this folder (not the folder itself): `index.html`, `beta/`, `original/`, `sw.js`, `manifest.webmanifest`, icons, `404.html`, `.nojekyll` and the rest.
2. Settings › Pages › Deploy from a branch › `main` / root.
3. Open the address GitHub shows. After one visit the whole site works offline.
4. Optional: put the `downloads/` folder in the repository so the Get FretLab page can offer the platform packages.

## Any other static host
Upload the same files. HTTPS is required for offline install and the service worker (localhost also works).

## After publishing – check
* Open the site in a private window; open **About › Diagnostics › Run self-test** (Beta, Shift+I).
* Turn off the network and reload: it should still open.
* Open `beta/index.html?safe=1` to confirm factory-settings mode works.

## Updating
Increase the version in `sw.js` (the build does this) and upload all files. Open copies show "FretLab was updated – reload" once the new version has installed.

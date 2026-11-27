#!/bin/bash
# Copies the app's pages into the Android project (run once before building from the repository;
# the downloadable Android package already has them in place).
set -e
cd "$(dirname "$0")"
mkdir -p app/src/main/assets
cp ../beta/index.html app/src/main/assets/fretlab.html
cp ../beta/pg18.js ../beta/chopin8.js ../beta/classical-midi.js app/src/main/assets/
cp ../ManicRulesGuitar-Guide.pdf app/src/main/assets/ManicRulesGuitar-Guide.pdf
mkdir -p app/src/main/assets/engines
cp ../engines/*.js app/src/main/assets/engines/
echo "Assets ready in app/src/main/assets"

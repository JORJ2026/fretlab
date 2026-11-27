#!/bin/bash
# Copies the app's pages into the Android project (run once before building from the repository;
# the downloadable Android package already has them in place).
set -e
cd "$(dirname "$0")"
mkdir -p app/src/main/assets
cp ../downloads/FretLab-12-Beta.html app/src/main/assets/fretlab.html
cp ../FretLab-Guide.pdf app/src/main/assets/FretLab-Guide.pdf
echo "Assets ready in app/src/main/assets"

#!/bin/bash
# Needs: JDK 17+, Android SDK (ANDROID_HOME set). First build downloads the Android Gradle plugin; after that it works offline.
cd "$(dirname "$0")"
if [ -x ./gradlew ]; then ./gradlew assembleDebug; else gradle assembleDebug; fi
echo; echo "APK: $(pwd)/app/build/outputs/apk/debug/app-debug.apk"

@echo off
rem Needs: JDK 17+, Android SDK (ANDROID_HOME set).
cd /d "%~dp0"
if exist gradlew.bat (call gradlew.bat assembleDebug) else (gradle assembleDebug)
echo.
echo APK: %cd%\app\build\outputs\apk\debug\app-debug.apk
pause

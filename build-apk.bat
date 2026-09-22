@echo off
setlocal
title Mizaan-e-Ilm AI - Android APK Builder
cls
echo =====================================================================
echo                MIZAAN-E-ILM AI - ANDROID APK BUILDER
echo =====================================================================
echo.

set "JAVA_HOME=C:\Users\zuni\android-tools\jdk-21\jdk-21.0.12.1+1"
set "ANDROID_HOME=C:\Users\zuni\android-tools\android-sdk"
set "ANDROID_SDK_ROOT=C:\Users\zuni\android-tools\android-sdk"
set "PATH=%JAVA_HOME%\bin;%ANDROID_HOME%\cmdline-tools\latest\bin;%ANDROID_HOME%\platform-tools;%PATH%"

echo [1/4] Preparing Web Assets...
if not exist "%~dp0out" mkdir "%~dp0out"
copy /Y "%~dp0index.html" "%~dp0out\index.html" >nul
if exist "%~dp0logo.jpg" copy /Y "%~dp0logo.jpg" "%~dp0out\logo.jpg" >nul

echo [2/4] Syncing Capacitor Android Platform...
cd /d "%~dp0"
call npx cap sync android

echo [3/4] Compiling and Assembling APK with Gradle...
cd /d "%~dp0android"
call gradlew.bat assembleDebug

echo [4/4] Finalizing APK Output...
if not exist "%~dp0APK_OUTPUT" mkdir "%~dp0APK_OUTPUT"
set "SOURCE_APK=%~dp0android\app\build\outputs\apk\debug\app-debug.apk"
set "FINAL_APK=%~dp0APK_OUTPUT\Mizaan-e-Ilm-AI.apk"

if exist "%SOURCE_APK%" (
    copy /Y "%SOURCE_APK%" "%FINAL_APK%" >nul
    echo.
    echo =====================================================================
    echo  [SUCCESS] APK is READY!
    echo.
    echo  Direct APK File: %FINAL_APK%
    echo =====================================================================
    echo.
    explorer "%~dp0APK_OUTPUT"
) else (
    echo.
    echo =====================================================================
    echo  [ERROR] Build could not be completed. Please check errors above.
    echo =====================================================================
)
echo.
pause

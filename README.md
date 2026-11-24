# Grocery Market Mini

A pixel-art supermarket management game that runs in your browser. Build and grow your store while customers shop and your staff keep things moving.

**Play:** [Grocery Market Mini](https://fitzgerald-manurac.github.io/Grocery-Market-Mini/)

## What you can do

- Stock shelves and manage a growing grocery store.
- Hire staff to help restock products and serve customers.
- Step in at the counter for checkout and store activities like oden, deli, bakery, and coffee.
- Expand your store as your business grows.

## Run locally

You need Node.js 22 or later.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite to play.

## Project commands

```bash
npm test       # Run tests
npm run build  # Type-check and create a production build
```

Built with TypeScript and Vite.

## Desktop and Android apps

### Windows

Download the portable Windows x64 app:

**[Open the GitHub Releases page](https://github.com/Fitzgerald-Manurac/Grocery-Market-Mini/releases)**

Download the Windows x64 portable `.exe` from the latest release; no installer is needed. The download will be available after the app is uploaded as a GitHub Release asset.

### Android APK

Download the signed Android 7.0+ release APK:

**[Download Grocery Market Mini v1.0 for Android](release/Grocery-Market-Mini-v1.0.apk)**

On Android, enable installation from the browser or file manager:

1. Open the downloaded APK.
2. Allow installation from unknown apps if Android prompts you.
3. Tap **Install**, then open Grocery Market Mini.

The APK is signed, not debuggable, and uses the `com.fitzgeraldmanurac.grocerymarketmini` package.

### Build from source

The Windows app runs the game locally in its own window:

```bash
npm run app:windows
```

The portable executable is written to `release/`.

To prepare the Android app, install Android Studio with the Android SDK, then run:

```bash
npm run app:android:sync
npm run app:android:open
```

The Android Studio project is in `android/`. In Android Studio, build an APK with **Build → Build Bundle(s) / APK(s) → Build APK(s)**.

To build a signed release APK from the command line:

```bash
npm run app:android:sync
cd android
./gradlew assembleRelease
```

On Windows, use `gradlew.bat assembleRelease` instead. The signed APK is written to `android/app/build/outputs/apk/release/app-release.apk`.

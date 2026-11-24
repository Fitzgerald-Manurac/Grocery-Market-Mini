# Grocery Market Mini

Grocery Market Mini is a supermarket management game where you build a small shop into a busy neighborhood store. Stock shelves with groceries, set up your store, hire staff to help serve customers, and keep daily operations running as your business grows.

Customers have their own preferences and shopping habits, so the products you carry and the way you organize your store shape each day. When you want a more hands-on challenge, step in at the counter to check out customers or help at the oden, deli, bakery, and coffee stations. Expand your store over time and create a market that fits the way you want to play.

Play in your browser, or download the portable Windows app or Android APK below.

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

**[Download Grocery Market Mini for Windows](https://github.com/Fitzgerald-Manurac/Grocery-Market-Mini/releases/download/v0.1.0/Grocery.Market.Mini-0.1.0-x64.exe)**

Run the downloaded Windows x64 portable `.exe`; no installer is needed. Windows may show a SmartScreen warning because the app is not code-signed.

### Android APK

Download the signed Android 7.0+ release APK:

**[Download Grocery Market Mini v1.1 for Android](release/Grocery-Market-Mini-v1.1.apk)**

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

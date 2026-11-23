# Grocery Market Mini

A supermarket management game that runs in your browser. Build and grow your store while customers shop and your staff keep things moving.

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

## Project structure

The repository is organized by platform, game feature, and development task:

| Path | Purpose |
| --- | --- |
| `.github/workflows/` | Runs automated tests and browser smoke checks, then deploys the web game to GitHub Pages. |
| `android/` | Native Android wrapper and Gradle project for building the APK. |
| `electron/` | Electron main process used by the Windows desktop app. |
| `public/` | Static images, icons, web-app manifest, and service worker. |
| `release/` | Android APK shared from this repository; desktop installers are attached to GitHub Releases. |
| `src/` | TypeScript source for the game, simulation, rendering, and user interface. |
| `tests/` | Automated tests for game rules, simulation, progression, and save data. |
| `tools/` | Asset generators, content data, economy simulation, and browser smoke-test scripts. |

### Source code

| Path | Purpose |
| --- | --- |
| `src/core/` | Shared assets, audio, preferences, and random-number utilities. |
| `src/data/` | Game data for the world, characters, and products. |
| `src/game/` | Game state, simulation, rules, progression, layout, and achievements. |
| `src/i18n/` | Translation dictionaries and language-selection helpers. |
| `src/mini/` | Counter minigames such as checkout, bakery, coffee, deli, and oden. |
| `src/render/` | Canvas-based world renderer. |
| `src/ui/` | Menus, panels, store screens, and other interface components. |
| `src/main.ts` | Browser app entry point. |
| `src/style.css` | Global game styles. |

### Root configuration files

| File | Purpose |
| --- | --- |
| `package.json` / `package-lock.json` | Project scripts and pinned JavaScript dependencies. |
| `index.html` | Web app HTML entry point. |
| `capacitor.config.ts` | Capacitor settings shared with the Android app. |
| `vite.config.ts` | Web development and production-build configuration. |
| `tsconfig.json` | TypeScript compiler settings. |
| `vitest.config.ts` | Automated test-runner configuration. |
| `qodana.yaml` | Qodana code-inspection configuration. |
| `.gitignore` | Excludes dependencies, generated builds, and local signing credentials from Git. |

## Desktop and Android apps

### Windows

Download the portable Windows x64 app:

**[Download Grocery Market Mini for Windows](https://github.com/Fitzgerald-Manurac/Grocery-Market-Mini/releases/download/v0.1.0/Grocery.Market.Mini-0.1.0-x64.exe)**

Run the downloaded Windows x64 portable `.exe`; no installer is needed. Windows may show a SmartScreen warning because the app is not code-signed.

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

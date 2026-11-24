# Project map

This guide covers the files and folders tracked by Git. Build output, dependencies, local IDE files, and signing credentials are intentionally excluded.

## Folders

| Folder | Meaning |
| --- | --- |
| `.github/` | GitHub repository automation and its documentation. |
| `.github/workflows/` | GitHub Actions workflow definitions. |
| `android/` | Capacitor Android application and Gradle build. |
| `android/app/` | Android application module and configuration. |
| `android/app/src/` | Android source sets. |
| `android/app/src/androidTest/` | Tests that run on an Android device or emulator. |
| `android/app/src/androidTest/java/` | Java instrumentation-test source tree. |
| `android/app/src/androidTest/java/com/` | Android instrumentation-test Java package namespace. |
| `android/app/src/androidTest/java/com/getcapacitor/` | Capacitor instrumentation-test namespace. |
| `android/app/src/androidTest/java/com/getcapacitor/myapp/` | Sample instrumentation-test package. |
| `android/app/src/main/` | Main Android application source set. |
| `android/app/src/main/java/` | Android application Java source tree. |
| `android/app/src/main/java/com/` | Android application Java package namespace. |
| `android/app/src/main/java/com/fitzgeraldmanurac/` | Application owner namespace. |
| `android/app/src/main/java/com/fitzgeraldmanurac/grocerymarketmini/` | Grocery Market Mini Android activity package. |
| `android/app/src/main/res/` | Android resources such as icons, layouts, and themes. |
| `android/app/src/main/res/drawable/` | General drawable resources. |
| `android/app/src/main/res/drawable-v24/` | Drawable resources using Android API 24 or newer. |
| `android/app/src/main/res/drawable-land-hdpi/` | Landscape splash image for high-density screens. |
| `android/app/src/main/res/drawable-land-mdpi/` | Landscape splash image for medium-density screens. |
| `android/app/src/main/res/drawable-land-xhdpi/` | Landscape splash image for extra-high-density screens. |
| `android/app/src/main/res/drawable-land-xxhdpi/` | Landscape splash image for extra-extra-high-density screens. |
| `android/app/src/main/res/drawable-land-xxxhdpi/` | Landscape splash image for extra-extra-extra-high-density screens. |
| `android/app/src/main/res/drawable-port-hdpi/` | Portrait splash image for high-density screens. |
| `android/app/src/main/res/drawable-port-mdpi/` | Portrait splash image for medium-density screens. |
| `android/app/src/main/res/drawable-port-xhdpi/` | Portrait splash image for extra-high-density screens. |
| `android/app/src/main/res/drawable-port-xxhdpi/` | Portrait splash image for extra-extra-high-density screens. |
| `android/app/src/main/res/drawable-port-xxxhdpi/` | Portrait splash image for extra-extra-extra-high-density screens. |
| `android/app/src/main/res/layout/` | Android activity layout resources. |
| `android/app/src/main/res/mipmap-anydpi-v26/` | Adaptive launcher icon definitions for Android 8.0 and newer. |
| `android/app/src/main/res/mipmap-hdpi/` | High-density launcher icon images. |
| `android/app/src/main/res/mipmap-mdpi/` | Medium-density launcher icon images. |
| `android/app/src/main/res/mipmap-xhdpi/` | Extra-high-density launcher icon images. |
| `android/app/src/main/res/mipmap-xxhdpi/` | Extra-extra-high-density launcher icon images. |
| `android/app/src/main/res/mipmap-xxxhdpi/` | Extra-extra-extra-high-density launcher icon images. |
| `android/app/src/main/res/values/` | Android string, style, and color values. |
| `android/app/src/main/res/xml/` | Android XML configuration resources. |
| `android/app/src/test/` | Local Android unit-test source set. |
| `android/app/src/test/java/` | Java unit-test source tree. |
| `android/app/src/test/java/com/` | Android unit-test Java package namespace. |
| `android/app/src/test/java/com/getcapacitor/` | Capacitor unit-test namespace. |
| `android/app/src/test/java/com/getcapacitor/myapp/` | Sample Android unit-test package. |
| `android/gradle/` | Gradle wrapper support files. |
| `android/gradle/wrapper/` | Gradle wrapper JAR and version configuration. |
| `electron/` | Electron desktop application entry point. |
| `public/` | Static files served by the web app. |
| `public/assets/` | Game sprite sheets and graphical assets. |
| `release/` | APK download and release-folder documentation; Windows builds are on GitHub Releases. |
| `src/` | Main TypeScript game source. |
| `src/core/` | Shared asset, audio, preference, and random-number utilities. |
| `src/data/` | Structured game data for sprites, customers, and products. |
| `src/game/` | Game simulation, rules, state, progression, and world logic. |
| `src/i18n/` | Translation runtime and language dictionaries. |
| `src/i18n/generated/` | Generated translation JSON files. |
| `src/i18n/locales/` | Source translation dictionaries. |
| `src/mini/` | In-store minigame implementations. |
| `src/render/` | Canvas-based game world rendering. |
| `src/ui/` | Game menus, panels, and interface components. |
| `tests/` | Automated web-game tests. |
| `tools/` | Asset-generation, simulation, and smoke-test utilities. |

## Files

### Repository root

| File | Meaning |
| --- | --- |
| `.gitignore` | Excludes generated files, local configuration, and signing credentials from Git. |
| `README.md` | Project introduction, play links, download links, and build instructions. |
| `PROJECT_MAP.md` | This guide to tracked paths and their roles. |
| `capacitor.config.ts` | Capacitor app identity and web build directory configuration. |
| `index.html` | HTML entry point used by Vite. |
| `package.json` | Project metadata, scripts, and JavaScript dependencies. |
| `package-lock.json` | Exact dependency versions for repeatable npm installs. |
| `qodana.yaml` | Qodana static code inspection configuration. |
| `tsconfig.json` | TypeScript compiler settings. |
| `vite.config.ts` | Vite web app build and development-server settings. |
| `vitest.config.ts` | Vitest test-runner configuration. |

### GitHub

| File | Meaning |
| --- | --- |
| `.github/PURPOSE.md` | Explains the repository automation folder. |
| `.github/workflows/deploy.yml` | Runs tests and browser checks, then deploys the web app to GitHub Pages. |

### Android project

| File | Meaning |
| --- | --- |
| `android/.gitignore` | Android-specific generated-file and local-file exclusions. |
| `android/PURPOSE.md` | Explains the Android project folder. |
| `android/app/.gitignore` | Excludes generated Android app build files. |
| `android/app/build.gradle` | Android app ID, SDK versions, signing configuration, build types, and dependencies. |
| `android/app/capacitor.build.gradle` | Capacitor-generated Android build settings. |
| `android/app/proguard-rules.pro` | ProGuard/R8 keep and optimization rules. |
| `android/app/src/androidTest/java/com/getcapacitor/myapp/ExampleInstrumentedTest.java` | Sample Android device/emulator instrumentation test. |
| `android/app/src/main/AndroidManifest.xml` | Android app declaration, launcher activity, provider, and permissions. |
| `android/app/src/main/java/com/fitzgeraldmanurac/grocerymarketmini/MainActivity.java` | Starts the Capacitor bridge for the Android app. |
| `android/app/src/main/res/drawable-land-{hdpi,mdpi,xhdpi,xxhdpi,xxxhdpi}/splash.png` | Landscape splash-screen images at five screen densities. |
| `android/app/src/main/res/drawable-port-{hdpi,mdpi,xhdpi,xxhdpi,xxxhdpi}/splash.png` | Portrait splash-screen images at five screen densities. |
| `android/app/src/main/res/drawable/splash.png` | Default Android splash-screen image. |
| `android/app/src/main/res/drawable-v24/ic_launcher_foreground.xml` | Adaptive launcher icon foreground artwork. |
| `android/app/src/main/res/drawable/ic_launcher_background.xml` | Launcher icon background artwork. |
| `android/app/src/main/res/layout/activity_main.xml` | Native Android activity layout containing the Capacitor view. |
| `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml` | Adaptive launcher icon definition. |
| `android/app/src/main/res/mipmap-anydpi-v26/ic_launcher_round.xml` | Adaptive round launcher icon definition. |
| `android/app/src/main/res/mipmap-{hdpi,mdpi,xhdpi,xxhdpi,xxxhdpi}/ic_launcher.png` | Standard launcher icon images at five screen densities. |
| `android/app/src/main/res/mipmap-{hdpi,mdpi,xhdpi,xxhdpi,xxxhdpi}/ic_launcher_foreground.png` | Adaptive icon foreground images at five screen densities. |
| `android/app/src/main/res/mipmap-{hdpi,mdpi,xhdpi,xxhdpi,xxxhdpi}/ic_launcher_round.png` | Round launcher icon images at five screen densities. |
| `android/app/src/main/res/values/ic_launcher_background.xml` | Adaptive launcher icon background color value. |
| `android/app/src/main/res/values/strings.xml` | Android app and activity display names. |
| `android/app/src/main/res/values/styles.xml` | Android application, launch, and splash themes. |
| `android/app/src/main/res/xml/file_paths.xml` | FileProvider paths available for sharing files. |
| `android/app/src/test/java/com/getcapacitor/myapp/ExampleUnitTest.java` | Sample local Android unit test. |
| `android/build.gradle` | Top-level Android Gradle plugins and shared build configuration. |
| `android/capacitor.settings.gradle` | Includes Capacitor Android modules in Gradle. |
| `android/gradle.properties` | Project-wide Gradle and AndroidX settings. |
| `android/gradle/wrapper/gradle-wrapper.jar` | Gradle wrapper implementation. |
| `android/gradle/wrapper/gradle-wrapper.properties` | Gradle wrapper distribution version and download settings. |
| `android/gradlew` | Gradle wrapper launcher for macOS/Linux. |
| `android/gradlew.bat` | Gradle wrapper launcher for Windows. |
| `android/settings.gradle` | Android project module and repository settings. |
| `android/variables.gradle` | Shared Android SDK and dependency version values. |

### Electron desktop app

| File | Meaning |
| --- | --- |
| `electron/PURPOSE.md` | Explains the Electron folder. |
| `electron/main.cjs` | Creates the desktop window and configures Electron main-process behavior. |

### Public assets

| File | Meaning |
| --- | --- |
| `public/PURPOSE.md` | Explains the public web assets folder. |
| `public/apple-touch-icon.png` | Icon used when saving the site to an Apple device home screen. |
| `public/assets/atlas.png` | Sprite atlas for world and store objects. |
| `public/assets/chars.png` | Sprite sheet for characters and their animations. |
| `public/assets/products.png` | Main product sprite sheet. |
| `public/assets/products_small.png` | Small product sprite sheet for compact UI views. |
| `public/favicon.png` | Browser tab icon. |
| `public/icon-192.png` | 192-pixel web-app icon. |
| `public/icon-512.png` | 512-pixel web-app icon. |
| `public/icon.ico` | Windows desktop executable icon. |
| `public/manifest.webmanifest` | Progressive web app name, display mode, theme, and icons. |
| `public/og.png` | Open Graph preview image for shared links. |
| `public/sw.js` | Service worker for offline caching and web app requests. |

### Release download

| File | Meaning |
| --- | --- |
| `release/PURPOSE.md` | Explains the repository release-download folder. |
| `release/Grocery-Market-Mini-v1.2.apk` | Signed Android release APK for direct download. |

### Game source

| File | Meaning |
| --- | --- |
| `src/PURPOSE.md` | Explains the game source folder. |
| `src/core/assets.ts` | Loads and draws game image and sprite assets. |
| `src/core/audio.ts` | Game audio playback and sound effects. |
| `src/core/prefs.ts` | Reads and stores player preferences. |
| `src/core/rng.ts` | Seeded random-number utilities for repeatable game behavior. |
| `src/data/atlas.json` | Sprite names and coordinates in the world atlas. |
| `src/data/npcs.json` | Customer profiles, preferences, and behavior parameters. |
| `src/data/products.json` | Product catalog and game-facing product properties. |
| `src/debug.ts` | Development/debug helpers. |
| `src/game/achievements.ts` | Achievement definitions and unlock logic. |
| `src/game/agent.ts` | Staff agent behavior and decisions. |
| `src/game/ambience.ts` | Ambient world and background activity logic. |
| `src/game/arrange.ts` | Store item placement and arrangement helpers. |
| `src/game/calendar.ts` | In-game dates, seasons, and calendar events. |
| `src/game/chain.ts` | Store-chain progression and related gameplay logic. |
| `src/game/defs.ts` | Shared game constants, types, and definitions. |
| `src/game/game.ts` | Coordinates the active game session and updates. |
| `src/game/goals.ts` | Goal definitions and completion logic. |
| `src/game/growth.ts` | Store growth and expansion progression. |
| `src/game/layout.ts` | Store layout data and layout operations. |
| `src/game/names.ts` | Name-generation data and helpers. |
| `src/game/progress.ts` | Player progression and unlock state. |
| `src/game/rules.ts` | Core gameplay rules and calculations. |
| `src/game/savecode.ts` | Encodes and decodes portable save data. |
| `src/game/sim.ts` | Main store and customer simulation. |
| `src/game/state.ts` | Game-state structures, creation, and state updates. |
| `src/game/street.ts` | Street and neighborhood world behavior. |
| `src/i18n/generated/{en,ja,ko,zh}.json` | Generated English, Japanese, Korean, and Chinese translation data. |
| `src/i18n/index.ts` | Translation lookup, locale selection, and formatting helpers. |
| `src/i18n/locales/{en,ja,ko,zh}.ts` | Source English, Japanese, Korean, and Chinese translation dictionaries. |
| `src/main.ts` | Browser app entry point; initializes and starts the game. |
| `src/mini/bagging.ts` | Checkout bagging minigame. |
| `src/mini/bakery.ts` | Bakery minigame. |
| `src/mini/base.ts` | Shared minigame interface and common behavior. |
| `src/mini/checkout.ts` | Checkout and cashier minigame. |
| `src/mini/coffee.ts` | Coffee preparation minigame. |
| `src/mini/deli.ts` | Deli counter minigame. |
| `src/mini/oden.ts` | Oden counter minigame. |
| `src/render/world.ts` | Draws the store and surrounding world to canvas. |
| `src/style.css` | Global game, layout, and interface styles. |
| `src/ui/achievements.ts` | Achievement interface and unlock display. |
| `src/ui/app.ts` | Main interface setup and screen coordination. |
| `src/ui/build.ts` | Store construction and placement interface. |
| `src/ui/chain.ts` | Store-chain interface. |
| `src/ui/collection.ts` | Collection interface for game items and content. |
| `src/ui/dom.ts` | DOM element and UI construction helpers. |
| `src/ui/goals.ts` | Goal and objective interface. |
| `src/ui/notices.ts` | Notifications and in-game notices. |
| `src/ui/panels.ts` | Shared panels, dialogs, and navigation UI. |
| `src/ui/share.ts` | Share-card image and sharing interface. |
| `src/ui/store.ts` | Store management and product interface. |
| `src/ui/street.ts` | Street and neighborhood interface. |
| `src/vite-env.d.ts` | TypeScript declarations for Vite environment modules. |

### Tests

| File | Meaning |
| --- | --- |
| `tests/PURPOSE.md` | Explains the automated test folder. |
| `tests/calendar.test.ts` | Tests in-game calendar behavior. |
| `tests/features.test.ts` | Tests integrated game features and player-facing behavior. |
| `tests/progress.test.ts` | Tests progression and unlocking behavior. |
| `tests/rules.test.ts` | Tests gameplay rules and calculations. |
| `tests/savecode.test.ts` | Tests save-code encoding and decoding. |
| `tests/setup.ts` | Shared setup for the test environment. |
| `tests/sim.test.ts` | Tests core simulation behavior. |

### Development tools

| File | Meaning |
| --- | --- |
| `tools/PURPOSE.md` | Explains the development tools folder. |
| `tools/economy.config.ts` | Vitest configuration for economy simulations. |
| `tools/economy.sim.ts` | Economy-balancing simulation scenarios. |
| `tools/gen_cafe.py` | Generates cafe-related game artwork. |
| `tools/gen_chars.py` | Generates character sprite artwork. |
| `tools/gen_decor.py` | Generates store decoration artwork. |
| `tools/gen_local.py` | Generates localized game artwork and variants. |
| `tools/gen_mini.py` | Generates minigame artwork. |
| `tools/gen_products.py` | Generates product sprite artwork. |
| `tools/gen_products_local.py` | Generates localized product artwork. |
| `tools/gen_sprites.py` | Coordinates sprite generation tasks. |
| `tools/gen_street.py` | Generates street and neighborhood artwork. |
| `tools/gen_world.py` | Generates store and world artwork. |
| `tools/names.py` | Name-generation source data and helpers for asset tools. |
| `tools/offline-smoke.mjs` | Browser smoke test for offline behavior. |
| `tools/pix.py` | Shared pixel-art drawing helpers for Python generators. |
| `tools/preview_chars.py` | Creates a preview of generated character sprites. |
| `tools/preview_products.py` | Creates a preview of generated product sprites. |
| `tools/products.psv` | Product source data used by asset-generation tools. |
| `tools/products_i18n.py` | Product-name localization helpers for asset generation. |
| `tools/smoke.mjs` | Browser smoke test for the built web game. |

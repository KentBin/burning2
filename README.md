# Pool Room Loyalty App

A mobile app for pool room customers to **log in with their phone number**, track **loyalty points**, and stay updated on **promotions and events**.

Built with **Expo (SDK 50)** and **React Native 0.73**.

---

## 1. Features

* Phone number authentication (Firebase)
* View accumulated loyalty points
* Promotions & announcements
* Smooth mobile UI with animations

---

## 2. Requirements

### Recommended environment

* **Node.js:** 18.x (e.g. 18.20.4)
* **npm:** 9.x
* **Android Studio:** installed (for Android builds)
* **ADB / USB Debugging:** enabled for physical device testing

> Newer Node (20+) and npm (10/11) may cause dependency issues.

---

## 3. Setup

### Install Node (via nvm)

```bash
nvm install 18.20.4
nvm use 18.20.4
```

Verify:

```bash
node -v
npm -v
```

---

### Clean project (important)

```bash
rd /s /q node_modules
del package-lock.json
npm cache clean --force
```

---

### Install dependencies

```bash
npm install --legacy-peer-deps
```

---

## 4. Running the App

### Recommended: Run on real Android device

1. Connect phone via USB
2. Enable **USB Debugging**
3. Verify:

```bash
adb devices
```

4. Run:

```bash
npx expo run:android
```

---

### Alternative: Expo dev server

```bash
npx expo start
```

> Note: Expo Go may not fully work due to Firebase native modules.

---

## 5. Common Issues

### Dependency conflicts

```bash
npm install --legacy-peer-deps
```

---

### Metro cache issues

```bash
npx expo start --clear
```

---

### Android build issues

```bash
cd android
gradlew clean
cd ..
```

---

### Device not detected

```bash
adb kill-server
adb start-server
adb devices
```

---

## 6. Notes

* Uses Firebase for authentication and data
* Some dependencies are outdated and may need replacement in future updates
* Two flip-card libraries exist; consider removing unused ones

---

## 7. Suggested Future Improvements

* Upgrade Expo SDK
* Replace deprecated UI libraries
* Add push notifications for promotions
* Improve offline support

---

## 8. Quick Start

```bash
nvm use 18.20.4
npm install --legacy-peer-deps
npx expo run:android
```

---

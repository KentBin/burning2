Pool Room Loyalty Platform

A customer loyalty platform for pool clubs consisting of:

React Native mobile app for members
Web-based POS dashboard for staff
Firebase Realtime Database backend
Real-time loyalty point synchronization

Customers can log in using their registered phone number to view their membership information, loyalty points, transaction history, promotions, and digital membership QR code.

Staff can complete sales through a POS dashboard, which automatically awards loyalty points and records transactions.

Built with Expo (SDK 50), React Native 0.73, and Firebase.

1. Features
   Customer Mobile App
   Phone number authentication (Firebase)
   Membership profile
   Digital membership QR code
   Real-time loyalty point balance
   Transaction history
   Promotions and announcements
   Pull-to-refresh support
   Animated UI and point update notifications
   Staff POS Dashboard
   Customer lookup by phone number
   Complete sales transactions
   Automatic point calculation
   Automatic point awarding
   Transaction record creation
   Real-time synchronization with customer accounts
2. System Architecture
   Staff POS Dashboard
   │
   ▼
   Firebase Realtime Database
   │
   ▼
   Customer Mobile App

When a staff member completes a sale:

Sale Completed
│
▼
Create Transaction
│
▼
Update Customer Balance
│
▼
Realtime Update To Mobile App
3. Tech Stack
   Mobile App
   React Native
   Expo Router
   TypeScript
   Zustand
   React Native Reanimated
   Firebase Authentication
   Firebase Realtime Database
   POS Dashboard
   React
   TypeScript
   Firebase SDK
   Backend Services
   Firebase Authentication
   Firebase Realtime Database
4. Firebase Data Structure
   {
   "clientApp": {
   "0901234567": {
   "Name": "Nguyễn Văn A",

   "balance": {
   "points": 500
   },

   "transactions": {
   "-Nabc123": {
   "type": "earn",
   "amount": 120000,
   "points": 12,
   "location": "Burning Billiards",
   "createdAt": 1712345678901
   }
   }
   }
   }
   }
5. Requirements
   Recommended Environment
   Node.js 18.x
   npm 9.x
   Android Studio
   ADB / USB Debugging enabled

Newer Node versions may require dependency updates.

6. Setup
   Install Node
   nvm install 18.20.4
   nvm use 18.20.4

Verify installation:

node -v
npm -v
Install Dependencies
npm install --legacy-peer-deps
7. Running the Mobile App
   Android Device
   adb devices
   npx expo run:android
   Development Server
   npx expo start

Expo Go may not support all Firebase native modules.

8. Running the POS Dashboard

Install dependencies:

npm install

Start development server:

npm run dev

Open:

http://localhost:5173

(or the URL displayed by Vite)

9. Loyalty Point Rules

Current demo implementation:

10,000 VND = 1 Loyalty Point

Examples:

Bill Amount	Points Earned
50,000đ	5
120,000đ	12
250,000đ	25

Points are automatically added when a sale is completed through the POS dashboard.

10. Common Issues
    Dependency Conflicts
    npm install --legacy-peer-deps
    Metro Cache Issues
    npx expo start --clear
    Android Build Issues
    cd android
    gradlew clean
    cd ..
    Device Not Detected
    adb kill-server
    adb start-server
    adb devices
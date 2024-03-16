// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4BCBO8BAnsiT3oyjjIlyGXmC7PUkmZrs",
  authDomain: "brning9.firebaseapp.com",
  databaseURL: "https://brning9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "brning9",
  storageBucket: "brning9.appspot.com",
  messagingSenderId: "715208250022",
  appId: "1:715208250022:web:f7e46c83558e63aa04da67"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCZC0y9FQMOGjjItt1GG6LD_r9qutaWsao",
  authDomain: "web-app-513e7.firebaseapp.com",
  projectId: "web-app-513e7",
  storageBucket: "web-app-513e7.appspot.com",
  messagingSenderId: "302332120803",
  appId: "1:302332120803:web:41abd5a36d7f7355b0ffd6",
  measurementId: "G-3RJNGSREKP"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
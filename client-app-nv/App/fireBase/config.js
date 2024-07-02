// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCZC0y9FQMOGjjItt1GG6LD_r9qutaWsao",
  authDomain: "web-app-513e7.firebaseapp.com",
  projectId: "web-app-513e7",
  storageBucket: "web-app-513e7",
  messagingSenderId: "302332120803",
  appId: "1:302332120803:web:41abd5a36d7f7355b0ffd6",
  measurementId: "G-3RJNGSREKP"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firebase Auth with AsyncStorage
let auth;
try {
  auth = getAuth(app);
} catch (e) {
  if (e.code === 'auth/already-initialized') {
    auth = getAuth();
  } else {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  }
}

export const FIREBASE_AUTH = auth;
export const FIREBASE_DB = getFirestore(app);

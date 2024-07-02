// Import the functions you need from the SDKs you need
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Import the service account key JSON
const serviceAccount = require('./web-app-513e7-firebase-adminsdk-jf6jl-295a56a069.json');

const firebaseConfig = {
  credential: cert(serviceAccount),
  apiKey: "AIzaSyCZC0y9FQMOGjjItt1GG6LD_r9qutaWsao",
  authDomain: "web-app-513e7.firebaseapp.com",
  projectId: "web-app-513e7",
  storageBucket: "web-app-513e7.appspot.com",
  messagingSenderId: "302332120803",
  appId: "1:302332120803:web:41abd5a36d7f7355b0ffd6",
  measurementId: "G-3RJNGSREKP"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb-c5q1dsVCl5gTAo_zoGansfdssmJwUY",
  authDomain: "note-webapp-79955.firebaseapp.com",
  projectId: "note-webapp-79955",
  storageBucket: "note-webapp-79955.appspot.com",
  messagingSenderId: "1036982707102",
  appId: "1:1036982707102:web:fadf3eaa6dd8ada485ec8f",
  measurementId: "G-ECE1EVY99P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 getAnalytics(app);
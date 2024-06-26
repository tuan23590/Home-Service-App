// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
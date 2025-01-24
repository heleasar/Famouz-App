// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTy3z7YYoIUfoaeIE0TnsAnp0Gi0VPevc",
  authDomain: "summer-reducer-448400-v0.firebaseapp.com",
  projectId: "summer-reducer-448400-v0",
  storageBucket: "summer-reducer-448400-v0.firebasestorage.app",
  messagingSenderId: "746813328519",
  appId: "1:746813328519:web:a6fa1704331563fd7dbc22",
  measurementId: "G-MRH6SJDR1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
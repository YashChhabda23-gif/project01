// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDacMvUsYJXImS3QByI9YNdo3ZGlUXDFbs",
  authDomain: "gamified-01-9bf8f.firebaseapp.com",
  projectId: "gamified-01-9bf8f",
  storageBucket: "gamified-01-9bf8f.firebasestorage.app",
  messagingSenderId: "514090602565",
  appId: "1:514090602565:web:cf1b86be14f9a2f71e132c",
  measurementId: "G-DMFGFYC2ZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

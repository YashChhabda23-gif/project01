// Import from Firebase CDN (v9 modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, setDoc } 
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDacMvUsYJXImS3QByI9YNdo3ZGlUXDFbs",
  authDomain: "gamified-01-9bf8f.firebaseapp.com",
  projectId: "gamified-01-9bf8f",
  storageBucket: "gamified-01-9bf8f.firebasestorage.app",
  messagingSenderId: "514090602565",
  appId: "1:514090602565:web:cf1b86be14f9a2f71e132c",
  measurementId: "G-DMFGFYC2ZD"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

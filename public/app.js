// app.js
import { app } from "./firebase-config.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(app);

// Handle Login Form
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      document.getElementById("message").innerText = "Login successful!";
      console.log("Logged in:", userCredential.user);
      // redirect to student dashboard
      window.location.href = "student-dashboard.html"; 
    })
    .catch((error) => {
      document.getElementById("message").innerText = error.message;
    });
});

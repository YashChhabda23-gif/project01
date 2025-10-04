// admin.js
import { app } from "./firebase-config.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

// Teacher Login
document.getElementById("adminLoginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      document.getElementById("adminMessage").innerText = "Admin logged in!";
      console.log("Admin:", userCredential.user);
    })
    .catch((error) => {
      document.getElementById("adminMessage").innerText = error.message;
    });
});

// Create Module
document.getElementById("createModuleForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("moduleTitle").value;
  const description = document.getElementById("moduleDescription").value;

  try {
    await addDoc(collection(db, "modules"), {
      title: title,
      description: description,
      xp: 50
    });
    alert("Module created successfully!");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
});

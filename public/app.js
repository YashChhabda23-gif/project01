import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { collection, getDocs, setDoc, doc, query, orderBy } 
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const signupBtn = document.getElementById("signupBtn");
const signinBtn = document.getElementById("signinBtn");

signupBtn.onclick = async () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, pass);
    await setDoc(doc(db, "users", userCred.user.uid), {
      email,
      role: "student",
      xp: 0
    });
    alert("Signed up!");
  } catch (e) {
    alert(e.message);
  }
};

signinBtn.onclick = async () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch (e) {
    alert(e.message);
  }
};

// When logged in → fetch modules
onAuthStateChanged(auth, async (user) => {
  if (!user) return;
  document.getElementById("app").style.display = "block";

  const q = query(collection(db, "modules"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  const list = document.getElementById("modulesList");
  list.innerHTML = "";
  snap.forEach((docSnap) => {
    const m = docSnap.data();
    list.innerHTML += `<div><b>${m.title}</b><p>${m.content}</p></div>`;
  });
});

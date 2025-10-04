import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

document.getElementById("createModule").onclick = async () => {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  await addDoc(collection(db, "modules"), {
    title,
    content,
    createdAt: serverTimestamp()
  });

  alert("Module created!");
};

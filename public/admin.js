// admin.js
const adminSignIn = document.getElementById('adminSignIn');
const createArea = document.getElementById('createArea');
adminSignIn.onclick = async () => {
  const email = document.getElementById('adminEmail').value;
  const pass = document.getElementById('adminPassword').value;
  try {
    const user = await firebase.auth().signInWithEmailAndPassword(email, pass);
    // mark this user as teacher in users collection (one-time)
    await db.collection('users').doc(user.user.uid).set({role:'teacher', email: email}, {merge:true});
    createArea.style.display = 'block';
  } catch(e) {
    // if user doesn't exist, create and set teacher role
    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(email, pass);
      await db.collection('users').doc(user.user.uid).set({role:'teacher', email: email});
      createArea.style.display = 'block';
    } catch(err) { alert(err.message); }
  }
};

document.getElementById('createModuleBtn').onclick = async () => {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  let qs = [];
  try { qs = JSON.parse(document.getElementById('questions').value); }
  catch(e){ alert('Invalid JSON for questions'); return; }
  const mod = { title, content, questions: qs, createdAt: firebase.firestore.FieldValue.serverTimestamp() };
  const doc = await db.collection('modules').add(mod);
  document.getElementById('status').innerText = 'Module created: ' + doc.id;
};

const auth = firebase.auth();
const db = firebase.firestore();

document.getElementById('signupBtn').onclick = async () => {
  const email = email.value, pass = password.value;
  try {
    const u = await auth.createUserWithEmailAndPassword(email, pass);
    await db.collection('users').doc(u.user.uid).set({email, role:'student', xp:0});
    alert("Signed up");
  } catch(e){ alert(e.message); }
};

document.getElementById('signinBtn').onclick = async () => {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  try {
    await auth.signInWithEmailAndPassword(email, pass);
  } catch(e){ alert(e.message); }
};

auth.onAuthStateChanged(async user => {
  if(!user) { document.getElementById('app').style.display='none'; return; }
  document.getElementById('app').style.display='block';
  const modulesSnap = await db.collection('modules').orderBy('createdAt','desc').get();
  const list = document.getElementById('modulesList');
  list.innerHTML = '';
  modulesSnap.forEach(doc => {
    const m = doc.data();
    const el = document.createElement('div');
    el.innerHTML = `<strong>${m.title}</strong><p>${m.content || ''}</p>`;
    list.appendChild(el);
  });
});


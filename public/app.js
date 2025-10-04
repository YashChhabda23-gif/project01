// app.js
const signupBtn = document.getElementById('signupBtn');
const signinBtn = document.getElementById('signinBtn');
const roleSelect = document.getElementById('roleSelect');

signupBtn.onclick = async () => {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  const role = roleSelect.value;
  try {
    const cred = await firebase.auth().createUserWithEmailAndPassword(email, pass);
    await db.collection('users').doc(cred.user.uid).set({role, email, xp:0});
  } catch(e) { alert(e.message); }
};

signinBtn.onclick = async () => {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  try {
    await firebase.auth().signInWithEmailAndPassword(email, pass);
  } catch(e) { alert(e.message); }
};

// auth listener
auth.onAuthStateChanged(async (user) => {
  if (!user) {
    document.getElementById('authArea').style.display='block';
    document.getElementById('app').style.display='none';
    document.getElementById('navRight').innerHTML = '';
    return;
  }
  // show app
  document.getElementById('authArea').style.display='none';
  document.getElementById('app').style.display='block';
  document.getElementById('navRight').innerHTML = `<button id="logout" class="btn btn-sm btn-danger">Log out</button>`;
  document.getElementById('logout').onclick = () => auth.signOut();

  // load user xp & badges
  const userDoc = await db.collection('users').doc(user.uid).get();
  const data = userDoc.exists ? userDoc.data() : {};
  document.getElementById('xp').innerText = data.xp || 0;

  // load modules
  loadModules();
});

async function loadModules(){
  const modulesList = document.getElementById('modulesList');
  modulesList.innerHTML = 'Loading...';
  const snap = await db.collection('modules').orderBy('createdAt','desc').get();
  modulesList.innerHTML = '';
  snap.forEach(doc => {
    const m = doc.data();
    const card = document.createElement('div');
    card.className='card p-3 mb-2';
    card.innerHTML = `<h5>${m.title}</h5><p>${(m.content||'').substring(0,200)}...</p>
      <button class="btn btn-sm btn-primary" onclick="openModule('${doc.id}')">Open</button>`;
    modulesList.appendChild(card);
  });
}

window.openModule = async (id) => {
  const doc = await db.collection('modules').doc(id).get();
  const m = doc.data();
  document.getElementById('moduleView').style.display='block';
  document.getElementById('moduleTitle').innerText = m.title;
  document.getElementById('moduleContent').innerHTML = m.content;
  document.getElementById('startQuizBtn').onclick = () => startQuiz(id, m.questions);
};

function startQuiz(moduleId, questions){
  document.getElementById('quizArea').style.display='block';
  const qArea = document.getElementById('quizArea');
  qArea.innerHTML = '';
  questions.forEach((q, qi) => {
    const div = document.createElement('div');
    div.innerHTML = `<p><b>Q${qi+1}:</b> ${q.q}</p>`;
    q.options.forEach((opt, oi) => {
      const id = `q${qi}o${oi}`;
      div.innerHTML += `<div><input type="radio" name="q${qi}" value="${oi}" id="${id}"> <label for="${id}">${opt}</label></div>`;
    });
    qArea.appendChild(div);
  });
  qArea.innerHTML += `<button class="btn btn-success mt-2" onclick="submitQuiz('${moduleId}', ${JSON.stringify(questions)})">Submit</button>`;
}

window.submitQuiz = async (moduleId, questions) => {
  const user = auth.currentUser;
  if(!user) { alert('Not signed in'); return; }
  let score = 0;
  questions.forEach((q, i) => {
    const radios = document.getElementsByName('q'+i);
    let sel = null;
    for (let r of radios) if (r.checked) sel = parseInt(r.value);
    if (sel === q.answer) score += (q.points||10);
  });

  const progress = {
    userId: user.uid,
    moduleId,
    score,
    completedAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  if (navigator.onLine) {
    await db.collection('progress').add(progress);
    // award XP and possibly badges
    await awardXp(user.uid, score);
    checkAndAwardBadges(user.uid, moduleId, score);
    alert('Quiz saved. Score: ' + score);
  } else {
    // offline: queue it
    queueOfflineProgress(progress);
    alert('Offline — quiz queued. It will sync when online.');
  }
};

// XP awarding (simple)
async function awardXp(uid, points) {
  await db.collection('users').doc(uid).set({ xp: firebase.firestore.FieldValue.increment(points) }, { merge:true });
  const userDoc = await db.collection('users').doc(uid).get();
  document.getElementById('xp').innerText = (userDoc.data().xp || 0);
}

// simple badge logic: if score >= threshold, add badge record
async function checkAndAwardBadges(uid, moduleId, score) {
  // simple example: if score >= 80% of max possible (sum points)
  // fetch module to compute maxPoints
  const modDoc = await db.collection('modules').doc(moduleId).get();
  const qs = modDoc.data().questions || [];
  const maxPoints = qs.reduce((s,q)=>s+(q.points||10),0);
  if (score >= 0.8 * maxPoints) {
    // check existing
    const bId = `module_${moduleId}_mastery`;
    const bDoc = await db.collection('users').doc(uid).collection('badges').doc(bId).get();
    if (!bDoc.exists) {
      await db.collection('users').doc(uid).collection('badges').doc(bId).set({name:'Module Mastery', moduleId, awardedAt: firebase.firestore.FieldValue.serverTimestamp()});
      // increment badge counter
      await db.collection('users').doc(uid).set({ badgeCount: firebase.firestore.FieldValue.increment(1) }, {merge:true});
    }
  }
}

/* Offline queue helpers */
function queueOfflineProgress(obj) {
  const q = JSON.parse(localStorage.getItem('syncQueue')||'[]');
  q.push(obj);
  localStorage.setItem('syncQueue', JSON.stringify(q));
}

async function flushQueue() {
  const q = JSON.parse(localStorage.getItem('syncQueue')||'[]');
  if (!q.length) return;
  for (let item of q) {
    await db.collection('progress').add(item);
    await awardXp(item.userId, item.score);
    await checkAndAwardBadges(item.userId, item.moduleId, item.score);
  }
  localStorage.removeItem('syncQueue');
}
window.addEventListener('online', () => { flushQueue(); });

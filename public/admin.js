const db = firebase.firestore();

document.getElementById('createModule').onclick = async () => {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  await db.collection('modules').add({
    title, content,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  alert("Module created!");
};


// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyB_HbLBaCT9iYNbamlOfPwOe3t43XByaa0",
    authDomain: "nurse-control.firebaseapp.com",
    projectId: "nurse-control",
  });
  
var db = firebase.firestore();

db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});
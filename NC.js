
var db = firebase.firestore();

db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
}).then((a) => {
    console.log("Document written with ID: ", a.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});
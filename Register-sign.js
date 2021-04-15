function Register() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(){
    
    Verify()
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ..
  });
}

function Sign() {
  var email2 = document.getElementById('email2').value;
  var password2 = document.getElementById('password2').value;

  firebase.auth().signInWithEmailAndPassword(email2, password2)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}

function Observer() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('Active user exists')
      Appear(user);
      //User signed in
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      console.log('------------------------')
      console.log('Email verify:')
      console.log(user.emailVerified)
      console.log('------------------------')
      var photoURL = user.photoURL;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      console.log('Active user doesnt exists')
      // User is signed out
      // ...
    }
  });
}

Observer();

function Appear(user) {
  var user = user;
  var content = document.getElementById('content');
  if (user.emailVerified) {
    content.innerHTML= `
    <p>Welcome!</p>
    <button onclick="Close()">Logout</button>
    <h1>Add Patient</h1>
    <input type="text" id="name" placeholder="name" class="form-control my-2"></input>
    <input type="text" id="last" placeholder="last" class="form-control my-2"></input>
    <input type="text" id="born" placeholder="born" class="form-control my-2"></input>
    <button class="btn btn-info" id="Savebutton" onclick="Save()">Save</button>
    `;  
  }
  
}

function Save() {

  var name = document.getElementById('name').value;
  var last = document.getElementById('last').value;
  var born = document.getElementById('born').value;

  db.collection("Patients").add({
    first: name,
    last: last,
    born: born

})
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    document.getElementById('name').value='';
    document.getElementById('last').value='';
    document.getElementById('born').value='';
})
.catch((error) => {
    console.error("Error adding document: ", error);
});

}

function Close() {
  firebase.auth().signOut()
  .then(function () {
    console.log('Signin out...')
  })
  .catch(function (error) {
    console.log(error)
  })
  
}

function Verify() {
  var user = firebase.auth().currentUser;
user.sendEmailVerification()
.then(function() {
  console.log('Sending email...')
  // Email sent.
})
.catch(function(error) {
  console.log(error)
  // An error happened.
});
}
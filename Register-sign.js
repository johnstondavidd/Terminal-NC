function Register() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
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
      Appear();
      //User signed in
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      console.log('Active user dont exist')
      // User is signed out
      // ...
    }
  });
}

Observer();

function Appear() {
  var content = document.getElementById('content');
  content.innerHTML= `
  <p>Welcome!</p>
  <button onclick="Close()">Logout</button>
  `;
  
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
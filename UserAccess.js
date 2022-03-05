//User Access

var db = firebase.firestore();

function Register() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function () {

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
      alert("Error singing up, please try again")
    });
  Observer();
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


function Appear(user) {
  var user = user;
  var content = document.getElementById('content');
  if (user.emailVerified) {
    location.href = "file:///E:/Facultad/Proyecto%20de%20sist%20digitales/Proyecto%20FINAL/NC-Terminal/index.html";


    if (win) {
      //Browser has allowed it to be opened.
      win.focus();
    } else {
      //Browser has blocked it
      alert('Please allow popups for this website');
      alert('Please Verify your email')
    }

  }
}

function Verify() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification()
    .then(function () {
      console.log('Sending email...')
      // Email sent.
    })
    .catch(function (error) {
      console.log(error)
      // An error happened.
    });
}
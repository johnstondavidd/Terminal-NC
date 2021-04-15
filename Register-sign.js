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
    `;  
  }
  
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

//Only for make branch again
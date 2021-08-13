var db = firebase.firestore();

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
    <h3 class="text-center">Add Patient</h3>
    <div class="container">
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand"></a>
          <div class="form-inline">
            <input id="name" type="text" placeholder="Name" class="form-control mr-sm-2">
            <input id="last" type="text" placeholder="Last" class="form-control mr-sm-2">
            <input id="born" type="text" placeholder="Born (dd/mm/yyyyy)" class="form-control mr-sm-2">
            <input id="DNI" type="text" placeholder="DNI" class="form-control mr-sm-2">
            <button class="btn btn-outline-success my-2 my-sm-0" onclick="SavePatient()">Add Patient</button>
          </div>
      </nav>
    </div>
    
    <h3 class="text-center">First Search Patient to add History</h3>
    <div class="container">
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand"></a>
          <div class="form-inline">
            <input id="search" type="text" placeholder="DNI" class="form-control mr-sm-2">
            <button class="btn btn-outline-success my-2 my-sm-0" onclick="PatientsSearch()">Search</button>
          </div>
      </nav>
    </div>
    
    <h3 class="text-center">Add History</h3>
    <div class="mb-3">
        <input type="text" class="form-control" id="history" placeholder="Add history here">
        <button class="btn btn-outline-success my-2 my-sm-0" onclick="SaveHistory()">Save History</button>
        <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Born</th>
            <th scope="col">DNI</th>
          </tr>
        </thead>
        <tbody id="table">
        </tbody>
      </table>
      </div>

    

    <button class="btn btn-danger position-absolute bottom-0 start-50 translate-middle-x" onclick="Close()">Logout</button>
    
    `

  }
  
}

function SavePatient() {

  var name = document.getElementById('name').value;
  var last = document.getElementById('last').value;
  var born = document.getElementById('born').value;
  var DNI = document.getElementById('DNI').value;
  //var db = firebase.firestore();

  db.collection("Patients").add({
    first: name,
    last: last,
    born: born,
    DNI: DNI,
})

  
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    document.getElementById('name').value='';
    document.getElementById('last').value='';
    document.getElementById('born').value='';
    document.getElementById('DNI').value='';
    db.collection('Patients').doc(docRef.id)
          .collection('History').add({
        })

    
    
})
.catch((error) => {
    console.error("Error adding document: ", error);
});


}

function PatientsSearch() {
  console.log("Entra a la funcion");
  var search = document.getElementById('search').value;
  console.log("DNI: ", search);
  var table = document.getElementById('table');
  db.collection("Patients").where("DNI", "==", search).onSnapshot((querySnapshot) => {
    table.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        table.innerHTML +=`
        <tr>
            <th scope="col">${doc.id}</th>
            <th scope="col">${doc.data().first}</th>
            <th scope="col">${doc.data().last}</th>
            <th scope="col">${doc.data().born}</th>
            <th scope="col">${doc.data().DNI}</th>
          </tr> 
        `
    });
});
}

function SaveHistory() {
  var history = document.getElementById('history').value;
  //var db = firebase.firestore();
 
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

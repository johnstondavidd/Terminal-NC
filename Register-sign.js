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
    </div>
        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
          <a class="navbar-brand"></a>
          <form class="d-flex">
          <input class="form-control me-2" id="PatientSearch" type="text" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" onclick="PatientSearch()">Search</button>
          </form>
          </div>
        </nav>
    </div> 
    
    <h3 class="text-center">Add History</h3>
    <div class="mb-3">
        <input type="text" class="form-control" id="history" placeholder="Add history here">
        <button class="btn btn-outline-success my-2 my-sm-0" onclick="SaveHistory()">Save History</button>
    </div>

    <table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Born</th>
        <th scope="col">DNI</th>
        <th scope="col">History</th>
      </tr>
    </thead>
    <tbody id = "table">
      <tr>
        <th scope="row"></th>
        <td></td>
        <td></td>
        <td></td>
      </tr>
     </tbody>
    </table>

    <button class="btn btn-danger position-absolute bottom-0 start-50 translate-middle-x" onclick="Close()">Logout</button>
    
    `

  }
  
}

function SavePatient() {

  var name = document.getElementById('name').value;
  var last = document.getElementById('last').value;
  var born = document.getElementById('born').value;
  var DNI = document.getElementById('DNI').value;
  var db = firebase.firestore();

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

function PatientSearch() {
  db.collection("Patients").where("PatientSearch", "==", true).get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
      });
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });
}



function SaveHistory() {
  var history = document.getElementById('history').value;
  var db = firebase.firestore();

  db.collection("Patients").add({
    first: namessssss,
    last: lastsssss,
    born: bornssssss,
    History

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

function ViewDatabase() {
  var table = document.getElementById('table');
  var db = firebase.firestore();
  db.collection("Patients").get().then((querySnapshot) => {
    table.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        table.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.first}</td>
        <td>${doc.last}</td>
        <td>${doc.born}</td>
        <td>${doc.DNI}</td>
        <td>${doc.History}</td>
        </tr>
        `
    });
});
}
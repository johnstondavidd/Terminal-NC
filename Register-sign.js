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
      // .....
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
            <input id="DNI" type="text" placeholder="DNI" class="form-control mr-sm-2">
            <input id="name" type="text" placeholder="Complete Name" class="form-control mr-sm-2">
            <input id="age" type="text" placeholder="Age" class="form-control mr-sm-2">
            <input id="room" type="text" placeholder="Room and bed" class="form-control mr-sm-2">
            <input id="cause" type="text" placeholder="Cause" class="form-control mr-sm-2">
            <input id="data" type="text" placeholder="Relevant Data" class="form-control mr-sm-2">
            <button class="btn btn-outline-success my-2 my-sm-0" id="mybutton" onclick="SavePatient()">Add Patient</button>
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
    
   
    <div class="mb-3">
        <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">DNI</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Room and bed</th>
            <th scope="col">Cause</th>
            <th scope="col">Relevant Data</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
            <th scope="col">Comments</th>
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
  var age = document.getElementById('age').value;
  var room = document.getElementById('room').value;
  var DNI = document.getElementById('DNI').value;
  var cause = document.getElementById('cause').value;
  var data = document.getElementById('data').value;
  //var db = firebase.firestore();

  db.collection("Patients").add({
    DNI: DNI,
    name: name,
    age: age,
    room: room,
    cause: cause,
    data: data,
    
})

  
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    document.getElementById('DNI').value='';
    document.getElementById('name').value='';
    document.getElementById('age').value='';
    document.getElementById('room').value='';
    document.getElementById('cause').value='';
    document.getElementById('data').value='';
    

    
    
})
.catch((error) => {
    console.error("Error adding document: ", error);
});


}

function PatientsSearch() {
  var search = document.getElementById('search').value;
  var flagsearch=0;
  db.collection("Patients").where("DNI", "==", search).onSnapshot((querySnapshot) => {
    table.innerHTML = '';
    querySnapshot.forEach((doc) => {
        table.innerHTML +=`
        <tr>
            <th scope="col">${doc.id}</th>
            <td>${doc.data().DNI}</td>
            <td>${doc.data().name}</td>
            <td>${doc.data().age}</td>
            <td>${doc.data().room}</td>
            <td>${doc.data().cause}</td>
            <td>${doc.data().data}</td>
            <td><button class="btn btn-warning" onclick="UpdatePatient('${doc.id}','${doc.data().DNI}','${doc.data().name}','${doc.data().age}','${doc.data().room}','${doc.data().cause}','${doc.data().data}')">Edit</button></td>
            <td><button class="btn btn-danger" onclick="DeletePatient('${doc.id}')">Delete</button></td>
            <td><button class="btn btn-success" onclick="CommentModal('${doc.id}')">Add Comment</button></td>
        </tr> 
        `
        Patientexists();
    });
    if (flagsearch==0) {
      console.log("No such a document!");
      var myModal = new bootstrap.Modal(document.getElementById('failed-search'))
      myModal.show()
    }
    
  });
            function Patientexists(){
              flagsearch=1;
              console.log("Document exists!");    
            }
            
            
}

function CommentModal(id) {

  console.log("You are going to add comments to document", id);
  var myModal = new bootstrap.Modal(document.getElementById('comment-modal'))
  myModal.show()
  
  var button=document.getElementById('Savebutton')
  button.onclick = function SaveNewComment() {
      var comment = document.getElementById('comment').value;
      db.collection('Patients').doc(id).collection('Comments').add({
        datetime: 'fecha y hora',
        comment : comment
      })
      myModal.hide()
    }
}




function DeletePatient(id) {
  db.collection("Patients").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});
  
}

function UpdatePatient(id,DNI,name,age,room,cause,data) {

  document.getElementById('DNI').value = DNI;
  document.getElementById('name').value = name;
  document.getElementById('age').value = age;
  document.getElementById('room').value = room;
  document.getElementById('cause').value = cause;
  document.getElementById('data').value = data;
  
  var button=document.getElementById('mybutton')

  button.innerHTML = 'Update';
  button.onclick = function () {
    
    var DocRef = db.collection("Patients").doc(id);
    var DNI = document.getElementById('DNI').value;
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var room = document.getElementById('room').value;
    var cause = document.getElementById('cause').value;
    var data = document.getElementById('data').value;

    // Set the "capital" field of the city 'DC'
    return DocRef.update({
      DNI: DNI,
      name: name,
      age: age,
      room: room,
      cause: cause,
      data: data
    })
    .then(() => {
        console.log("Document successfully updated!");
        button.innerHTML = 'Add Patient';
        document.getElementById('DNI').value = '';
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('room').value = '';
        document.getElementById('cause').value = '';
        document.getElementById('data').value = '';
        
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    }); 
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




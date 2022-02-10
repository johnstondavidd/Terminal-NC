var db = firebase.firestore();



function SavePatient() {

  var name = document.getElementById('name').value;
  var age = document.getElementById('age').value;
  //var room = document.getElementById('room').value;
  var DNI = document.getElementById('DNI').value;
  var cause = document.getElementById('cause').value;
  var data = document.getElementById('data').value;
  //var db = firebase.firestore();

  db.collection("Patients").doc(DNI).set({
    DNI: DNI,
    name: name,
    age: age,
    cause: cause,
    data: data,
    
})

  
.then(() => {
    console.log("Document written with ID: " + DNI);
    document.getElementById('DNI').value='';
    document.getElementById('name').value='';
    document.getElementById('age').value='';
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
            <td>${doc.data().cause}</td>
            <td>${doc.data().data}</td>
            <td><button class="btn btn-warning" onclick="UpdatePatient('${doc.id}','${doc.data().DNI}','${doc.data().name}','${doc.data().age}','${doc.data().cause}','${doc.data().data}')">Edit</button></td>
            <td><button class="btn btn-danger" onclick="DeletePatient('${doc.id}')">Delete</button></td>
            <td><button class="btn btn-success" onclick="CommentModal('${doc.id}')">Add Comment</button></td>
            <td><button class="btn btn-primary" onclick="ViewComments('${doc.id}')">View Comments</button></td>
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
  var Timestamp = firebase.firestore.Timestamp.fromDate(new Date());
  var myModal = new bootstrap.Modal(document.getElementById('comment-modal'))
  myModal.show()
  
  var button=document.getElementById('Savebutton')
  button.onclick = function SaveNewComment() {
      var comment = document.getElementById('comment').value;
      db.collection('Patients').doc(id).collection('Comments').add({
        comment : comment,
        datetime: Timestamp.toDate().toDateString() +'     ' +Timestamp.toDate().toLocaleTimeString('es-ES'),
        //prueba: Math.floor(Date.now() / 1000)
      })
      myModal.hide()
      console.log("Comment added succesfully");
    }
}

function ViewComments(id) {
  console.log("Viewing comments of:", id); 
  var myModal = new bootstrap.Modal(document.getElementById('viewcomments-modal'))
  myModal.show()
  db.collection("Patients").doc(id).collection("Comments").orderBy("datetime", "desc").onSnapshot((querySnapshot) => {
    viewtable.innerHTML = '';
    querySnapshot.forEach((doc) => {

        viewtable.innerHTML +=`
        <tr>  
            <td>${doc.data().datetime}</td>
            <td>${doc.data().comment}</td>
        </tr> 
        `
    });
    
    
  });
  
}


function DeletePatient(id) {
  db.collection("Patients").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});
  
}

function UpdatePatient(id,DNI,name,age,cause,data) {

  document.getElementById('DNI').value = DNI;
  document.getElementById('name').value = name;
  document.getElementById('age').value = age;
  document.getElementById('cause').value = cause;
  document.getElementById('data').value = data;
  
  var button=document.getElementById('mybutton')

  button.innerHTML = 'Update';
  button.onclick = function () {
    
    var DocRef = db.collection("Patients").doc(id);
    var DNI = document.getElementById('DNI').value;
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var cause = document.getElementById('cause').value;
    var data = document.getElementById('data').value;

    
    return DocRef.update({
      DNI: DNI,
      name: name,
      age: age,
      cause: cause,
      data: data
    })
    .then(() => {
        console.log("Document successfully updated!");
        button.onclick=function(){
          SavePatient();
         }
        button.innerHTML = 'Add Patient';
        document.getElementById('DNI').value = '';
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
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
  location.href="file:///E:/Facultad/Proyecto%20de%20sist%20digitales/Proyecto%20FINAL/NC-Terminal/UserAccess.html"
}





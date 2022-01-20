var addbedmodal;
var bedstate = 0;
var occuped = 1;
var free = 0;

function AddBed(bednumber) {
    myModal.hide();
    console.log("AddBed " + bednumber);
    addbedmodal = new bootstrap.Modal(document.getElementById('addbed-modal'))
    addbedmodal.show()
        
}

function ClearBed() {
    console.log("ClearBed "+ bednumber); 
}

function ShowBed() {
    console.log("Showbed "+ bednumber); 
}

function PatientsSearch4bed() {
    var search = document.getElementById('bedsearch').value;
    db.collection("Patients").where("DNI", "==", search).onSnapshot((querySnapshot) => {
      addbedtable.innerHTML = '';
      querySnapshot.forEach((doc) => {
          addbedtable.innerHTML +=`
          <tr>
              <td>${doc.data().DNI}</td>
              <td>${doc.data().name}</td>
              <td>${doc.data().age}</td>
              <td>${doc.data().room}</td>
              <td>${doc.data().cause}</td>
              <td>${doc.data().data}</td>
              <td><button class="btn btn-success" onclick="Bedpatient('${doc.data().DNI}','${doc.data().name}','${doc.data().age}','${doc.data().cause}')">Add</button></td>
          </tr> 
          `
        });
      
    });           
}

function Bedpatient(DNI,name,age,cause) {
    addbedmodal.hide()
    bedstate = occuped;
    console.log("Assigning  " + DNI + " - " + name + " - " + age + " - " + cause + bedstate); 
}
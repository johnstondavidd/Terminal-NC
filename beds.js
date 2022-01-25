var myModal
var addbedmodal;
var showDNI;
var showname;
var showage;
var showcause;

var fillbed = function () {
        beds.forEach(element => {
        if(element.id == bednumber){
            element.setColour("blue");
        }
    }
    );
    beds.forEach(element => {
        if(element.id == bednumber){
            element.printColour();
        }
    }
    );
}


function AddBed(bednumber) {
    myModal.hide();
    console.log("AddBed" + bednumber);
    addbedmodal = new bootstrap.Modal(document.getElementById('addbed-modal'))
    addbedmodal.show()
}

  function ClearBed() {
    console.log("ClearBed "+ bednumber); 
    beds.forEach(element => {
        if(element.id == bednumber){
            element.setColour("green");
        }
    }
    );
    beds.forEach(element => {
        if(element.id == bednumber){
            element.printColour();
        }
    }
    );
    myModal.hide();
    bedstate = free;
    console.log("Bed  "+ bednumber +  " is free   "  + bedstate); 
}


function Bedpatient(DNI,name,age,cause) {
    addbedmodal.hide()
    bedstate = occuped;
    console.log("Asigning  " + DNI + " - " + name + " - " + age + " - " + cause +  " - " + bedstate +  " - " + bednumber); 
    fillbed();
    showDNI = DNI;
    showname = name;
    showage = age;
    showcause = cause;
    
}


function ShowBed() {
    console.log("Showbed "+showDNI + showname + showage + showcause + bednumber); 
    showbedtable.innerHTML = '';
        showbedtable.innerHTML +=`
        <tr>
            <td>${showDNI}</td>
            <td>${showname}</td>
            <td>${showage}</td>
            <td>${showcause}</td>
        </tr> 
        `
        myModal.hide();
        console.log("Showing" + bednumber);
        showbedmodal = new bootstrap.Modal(document.getElementById('showbed-modal'))
        showbedmodal.show()
}

function PatientsSearch4bed() {
    var search = document.getElementById('bedsearch').value;
    var flagsearch=0;
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
          Patientexists1();
        });
        if (flagsearch==0) {
            console.log("No such a document!");
            alert("Document doesn't exists!. Please add it to the database or try again ");
          }
          
                  function Patientexists1(){
                    flagsearch=1;
                    console.log("Document exists!");    
                  } 
    });           
}




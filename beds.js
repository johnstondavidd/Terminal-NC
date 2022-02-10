var myModal
var addbedmodal;

var fillbedblue = function () {
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
            element.setDNI("");
            console.log("Bed obj DNI: " + element.DNI)
        }
    }
    );

    beds.forEach(element => {
        if(element.id == bednumber){
            element.setPatient("");
            console.log("Bed obj Patient: " + element.patient)
        }
    }
    );
    
    beds.forEach(element => {
        if(element.id == bednumber){
            element.setAge("");
            console.log("Bed obj Age: " + element.age)
        }
    }
    );

    beds.forEach(element => {
        if(element.id == bednumber){
            element.setCause("");
            console.log("Bed obj Cause: " + element.cause)
        }
    }
    );

    beds.forEach(element => {
        if(element.id == bednumber){
            element.setState("occupied");
            console.log("Bed obj State: " + element.state)
        }
    }
    );

    beds.forEach(element => {
        if(element.id == bednumber){
            element.setColour("green");
            element.setState("free");
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
    console.log("Bed  "+ bednumber +  " is free"); 
}


function Bedpatient(DNI,name,age,cause) {
    addbedmodal.hide()
    console.log("Asigning  " + DNI + " - " + name + " - " + age + " - " + cause +  " - " + bednumber); 
    fillbedblue();

    beds.forEach(element => {
        if(element.id == bednumber){
            element.setDNI(DNI);
            console.log("Bed obj DNI: " + element.DNI)
        }
    }
    );

    beds.forEach(element => {
        if(element.id == bednumber){
            element.setPatient(name);
            console.log("Bed obj Patient: " + element.patient)
        }
    }
    );
    
    beds.forEach(element => {
        if(element.id == bednumber){
            element.setAge(age);
            console.log("Bed obj Age: " + element.age)
        }
    }
    );

    beds.forEach(element => {
        if(element.id == bednumber){
            element.setCause(cause);
            console.log("Bed obj Cause: " + element.cause)
        }
    }
    );

    beds.forEach(element => {
        if(element.id == bednumber){
            element.setState("occupied");
            console.log("Bed obj State: " + element.state)
        }
    }
    );
    
}


function ShowBed() {
     beds.forEach(element => {
        if(element.id == bednumber){
            console.log("Bed obj DNI: " + element.DNI)
            console.log("Bed obj Patient: " + element.patient)
            console.log("Bed obj Age: " + element.age)
            console.log("Bed obj Cause: " + element.cause)
            showbedtable.innerHTML = '';
            showbedtable.innerHTML +=`
             <tr>
                    <td>${element.DNI}</td>
                    <td>${element.patient}</td>
                    <td>${element.age}</td>
                    <td>${element.cause}</td>
             </tr> 
            `
        }
    }
    );
    
    
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




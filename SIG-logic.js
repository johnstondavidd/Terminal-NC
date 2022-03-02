
var counter = 0;

var fillbedred = function (bednum) {
   beds.forEach(element => {
      if (element.id == bednum) {
         element.setColour("red");
      }
   }
   );
   beds.forEach(element => {
      if (element.id == bednum) {
         element.printColour();
      }
   }
   );

   beds.forEach(element => {
      if (element.id == bednum) {
         element.setState("call");
      }
   }
   );
}

var fillbedyellow = function (bednum) {
   beds.forEach(element => {
      if (element.id == bednum) {
         element.setColour("yellow");
      }
   }
   );

   beds.forEach(element => {
      if (element.id == bednum) {
         element.printColour();
      }
   }
   );

   beds.forEach(element => {
      if (element.id == bednum) {
         element.setState("attending");
      }
   }
   );
}

var resetcall = function (bednum) {
   beds.forEach(element => {
      if (element.id == bednum) {
         element.setColour("blue");
      }
   }
   );
   beds.forEach(element => {
      if (element.id == bednum) {
         element.printColour();
      }
   }
   );

   beds.forEach(element => {
      if (element.id == bednum) {
         element.setState("occupied");
      }
   }
   );
}

function CallEvent() {
   beds.forEach(element => {
      if (element.id == bednum && (element.state == "occupied" || element.state == "call")) {
         fillbedred(bednum);
         TIGCOM(bednum);
         SIGstate();
      } else if (element.id == bednum) {
         console.log("Call without patient in bed " + bednum);
      }
   }
   );


}

var TIGCOM = function (bn) {
   var TIGid;
   beds.forEach(element => {
      if (element.id == bn) {
         TIGid = element.TIGid;
      }
   }
   );

   TIGs.forEach(element => {
      if (element.id == TIGid && element.state == "free") {
         console.log("Making call of bed " + bn + " to TIG " + element.id);
         MqttPublish(bn, TIGid);
      }

      if (element.id == TIGid && (element.state == "occupied")) {
         TIGSelect(TIGid, bn);
      }
   }
   );



}

function TIGANSWER(msg) {

   var obj = JSON.parse(msg);
   bednum = obj.bed;
   var answer = obj.answer;
   switch (answer) {
      case "A":
         fillbedyellow(bednum);
         var t = obj.TIGID;
         TIGOccupied(t);
         counter = 0;
         SIGstate();
         break;

      case "D":
         var tt = obj.TIGID;
         TIGSelect(tt, bednum);
         SIGstate();
         break;

      case "F":
         resetcall(bednum);
         var ttt = obj.TIGID;
         TIGFree(ttt);
         SIGstate();
         break;

      case "T":
         console.log("Counter :" + counter)
         counter = counter + 1;;
         if (counter > 3) {
            var tt = obj.TIGID;
            TIGSelect(tt, bednum);
            counter = 0;
            break;

         }
         TIGCOM(bednum);

         break;

      default:
         break;
   }
}


function Recall() {
   console.log("Volver a enviar mensaje")
}

function ArchivedMessages() {
   console.log("Getting archived messages from database...");
      db.collection("CALLs").orderBy("datetime", "desc")
         .get()
         .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
               console.log(doc.id, " => ", doc.data());
               // element.fill = doc.data().fill;
               // element.state = doc.data().state;
               // element.DNI = doc.data().DNI;
               // element.patient = doc.data().patient;
               // element.age = doc.data().age;
               // element.cause = doc.data().cause;

            });
         })
         .catch((error) => {
            console.log("Error getting documents: ", error);
         });
   
}

function TIGSelect(tig, bn) {
   var flag = 0;
   TIGs.forEach(element => {
      if (element.id > tig && flag == 0) {
         if (element.state == "free") {
            console.log("Making call of bed " + bn + " to TIG " + element.id);
            var IDTIG = element.id
            MqttPublish(bn, IDTIG);
            flag = 1;
         }
      }
   }
   );

   TIGs.forEach(element => {
      if (element.id < tig && flag == 0) {
         if (element.state == "free") {
            console.log("Making call of bed " + bn + " to TIG " + element.id);
            var IDTIG = element.id
            MqttPublish(bn, IDTIG);
            flag = 1;
         }
      }
   }
   );
   var occupiedTIGs = 0;
   TIGs.forEach(element => {

      if (element.state == "occupied") {
         occupiedTIGs = occupiedTIGs + 1;
      }
   }
   );
   if (occupiedTIGs == TIGs.length) {
      saveCurrenCall(bn);
   }

}

function TIGOccupied(tid) {
   TIGs.forEach(element => {
      if (element.id == tid) {
         element.setState("occupied");
      }
   }
   );
}

function TIGFree(tid) {
   TIGs.forEach(element => {
      if (element.id == tid) {
         element.setState("free");
      }
   }
   );
}

function MqttPublish(bn, IDTIG) {

   beds.forEach(element => {
      if (element.id == bn) {
         const data = {
            ID: IDTIG,
            bed: bn,
            room: element.room,
            patient: element.patient,
            diagnosis: element.cause,
         }
         const str = JSON.stringify(data);
         console.log(str)
         client.publish("SIGR/TIG", str);

      }
   }
   );

}

function SIGstate() {
   console.log("Saving SIG state");
   saveCurrentBeds();
   saveCurrentTIGs();
   
}

function Getstate() {
   console.log("Getting last state from database...");
   ArchivedMessages();
   beds.forEach(element => {
      db.collection("BEDs").where("ID", "==", element.id)
         .get()
         .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
               if (doc.data().state != "free") {

               }
               console.log(doc.id, " => ", doc.data());
               element.fill = doc.data().fill;
               element.state = doc.data().state;
               element.DNI = doc.data().DNI;
               element.patient = doc.data().patient;
               element.age = doc.data().age;
               element.cause = doc.data().cause;

            });
         })
         .catch((error) => {
            console.log("Error getting documents: ", error);
         });
   }
   );
   
}

var saveCurrentBeds = function () {
   beds.forEach(element => {
      if (element.state == "occupied" || element.state == "call") {
         db.collection("BEDs").doc(element.text).set({
            ID: element.id,
            room: element.room,
            fill: element.fill,
            state: element.state,
            DNI: element.DNI,
            patient: element.patient,
            age: element.age,
            cause: element.cause

         })


            .then(() => {
               //console.log("BED", " ", element.text, " ", " last state saved");




            })
            .catch((error) => {
               console.error("Error adding document: ", error);
            });
      } else {
         db.collection("BEDs").doc(element.text).set({

            ID: element.id,
            room: element.room,
            fill: element.fill,
            state: element.state,

         })


            .then(() => {
               console.log("BED", " ", element.text, " ", " last state saved");




            })
            .catch((error) => {
               console.error("Error adding document: ", error);
            });

      }
   });
};

var saveCurrentTIGs = function () {
   TIGs.forEach(element => {
      db.collection("TIGs").doc(element.id).set({
         ID: element.id,
         state: element.state,
      })


         .then(() => {
            // console.log("TIG", " ", element.id, " ", " last state saved");




         })
         .catch((error) => {
            console.error("Error adding document: ", error);
         });


   });
};

var saveCurrenCall = function (bn) {
   console.log("Call Saved in DB")
   var Timestamp = firebase.firestore.Timestamp.fromDate(new Date());
   db.collection("CALLs").add({
      Bed: bn,
      datetime: Timestamp.toDate().toDateString() + '     ' + Timestamp.toDate().toLocaleTimeString('es-ES'),
   })


      .then(() => {
         // console.log("TIG", " ", element.id, " ", " last state saved");




      })
      .catch((error) => {
         console.error("Error adding document: ", error);
      });

}; 

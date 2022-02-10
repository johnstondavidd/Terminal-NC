
var fillbedred = function (bednum) {
   beds.forEach(element => {
   if(element.id == bednum){
       element.setColour("red");
   }
}
);
beds.forEach(element => {
   if(element.id == bednum){
       element.printColour();
   }
}
);

beds.forEach(element => {
   if(element.id == bednum){
       element.setState("call");
   }
}
);
}

var fillbedyellow = function (bednum) {
   beds.forEach(element => {
   if(element.id == bednum){
       element.setColour("yellow");
   }
}
);

beds.forEach(element => {
   if(element.id == bednum){
       element.printColour();
   }
}
);

beds.forEach(element => {
   if(element.id == bednum){
       element.setState("attending");
   }
}
);
}

var resetcall = function (bednum) {
   beds.forEach(element => {
   if(element.id == bednum){
       element.setColour("blue");
   }
}
);
beds.forEach(element => {
   if(element.id == bednum){
       element.printColour();
   }
}
);

beds.forEach(element => {
   if(element.id == bednum){
       element.setState("occupied");
   }
}
);
}

 function CallEvent() {
    fillbedred(bednum);
    TIGCOM(bednum);
 }
 
var TIGCOM = function (bn) {
   var TIGid;
   beds.forEach(element => {
      if(element.id == bn){
         TIGid = element.TIGid;
      }
   }
   );

   TIGs.forEach(element => {
      console.log("Element ID " + element.id + "Element state "+ element.state)
      if(element.id == TIGid && element.state == "free"){
         console.log("Making call of bed " + bn + " to TIG " + element.id);
       beds.forEach(element => {
          if(element.id == bn){
         const data = {
            ID: TIGid,
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

      if(element.id == TIGid && element.state == "occupied"){
      TIGSelect();
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
      break;

      case "D":
         TIGSelect();
      break;

      case "F":
         resetcall(bednum);
         var tt = obj.TIGID;
         TIGFree(tt);
         
      break;
   
      default:
         break;
   }  
}

function Recall() {
   console.log("Volver a enviar mensaje")
}

function TIGSelect() {
console.log("Making the call to another TIG ");
}

function TIGOccupied(tid) {
   TIGs.forEach(element => {
      if(element.id == tid){
          element.setState("occupied");
      }
   }
   );
}

function TIGFree(tid) {
   TIGs.forEach(element => {
      if(element.id == tid){
          element.setState("free");
      }
   }
   );
}
 
 

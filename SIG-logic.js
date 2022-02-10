


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
      TIGSelect(TIGid);
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
         var tt = obj.TIGID;
         TIGSelect(tt, bednum);
      break;

      case "F":
         resetcall(bednum);
         var ttt = obj.TIGID;
         TIGFree(ttt);
         
      break;
   
      default:
         break;
   }  
}

function Recall() {
   console.log("Volver a enviar mensaje")
}

function TIGSelect(tig, bn) {
   var flag=0;
   TIGs.forEach(element=> {
      if(element.id > tig && flag == 0){
         if (element.state == "free") {
            console.log("Making call of bed " + bn + " to TIG " + element.id);
            var IDTIG = element.id
            beds.forEach(element => {
               if(element.id == bn){
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
              flag=1;

              }
            }
            ); 
             
         }

         /*if (element.id < tig && flag == 0 ) {
            console.log("Making call of bed " + bn + " to TIG " + element.id);
            var IDTIG2 = element.id
            beds.forEach(element => {
               if(element.id == bn){
              const data = {
                 ID: IDTIG2,
                 bed: bn,
                 room: element.room,
                 patient: element.patient,
                 diagnosis: element.cause,
                 }
              const str = JSON.stringify(data);
              console.log(str)
              client.publish("SIGR/TIG", str);
              flag=1;
              }
            }
            ); 
             
         }*/
         
    
      } 
   }
   );

   TIGs.forEach(element=> {
      if(element.id < tig && flag == 0){
         if (element.state == "free") {
            console.log("Making call of bed " + bn + " to TIG " + element.id);
            var IDTIG = element.id
            beds.forEach(element => {
               if(element.id == bn){
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
              flag=1;

              }
            }
            ); 
             
         }

         /*if (element.id < tig && flag == 0 ) {
            console.log("Making call of bed " + bn + " to TIG " + element.id);
            var IDTIG2 = element.id
            beds.forEach(element => {
               if(element.id == bn){
              const data = {
                 ID: IDTIG2,
                 bed: bn,
                 room: element.room,
                 patient: element.patient,
                 diagnosis: element.cause,
                 }
              const str = JSON.stringify(data);
              console.log(str)
              client.publish("SIGR/TIG", str);
              flag=1;
              }
            }
            ); 
             
         }*/
         
    
      } 
   }
   );

}
/*console.log("Making the call to another TIG ");
var FreeTIGs=[];

TIGs.forEach(element => {
   if(element.id != tig && element.state == "free"){
      FreeTIGs.push(element.id)
   }
}
);
console.log("Free TIGs "+ FreeTIGs)
var Lenght = TIGs.length;
var tigint = parseInt(tig, 10);
var nextTIG = tigint + 1;

 if(nextTIG <= Lenght){
      console.log("Entro al if y hay cargados " + Lenght)
      if (nextTIG <= 9) {
         var TIGVector = [];
         TIGVector[0] = "0";
         TIGVector[1] = nextTIG.toString();
         var nextTIG2 = TIGVector.join('');
         console.log("nextTIG2 " + nextTIG2);
      }
      FreeTIGs.forEach(element => {
         if (nextTIG == element) {
            console.log ("llamar al TIG " + element)
         }
        GoBack(nextTIG); 
      }
      );
   }
   //nextTIG = 1;*/
 


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
 
 

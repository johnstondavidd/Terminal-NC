
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
   fillbedred(bednum);
   TIGCOM(bednum);
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

      if (element.id == TIGid && element.state == "occupied") {
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

      /* case "T":
          console.log("Counter :" + counter)
          counter = counter + 1;
          var tt2 = obj.TIGID;
          if (counter > 3 && tt2 != tt) {
             var tt = obj.TIGID;
             TIGSelect(tt, bednum);
             counter = 0;
          }
          TIGCOM(bednum);
          
       break;*/

      default:
         break;
   }
}

function Recall() {
   console.log("Volver a enviar mensaje")
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


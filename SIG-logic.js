var roombedcall;
var tigcom;

var fillbedred = function () {
   beds.forEach(element => {
   if(element.id == rbc){
       element.setColour("red");
   }
}
);
beds.forEach(element => {
   if(element.id == rbc){
       element.printColour();
   }
}
);
}

var fillbedyellow = function () {
   beds.forEach(element => {
   if(element.id == resetbed){
       element.setColour("yellow");
   }
}
);
beds.forEach(element => {
   if(element.id == resetbed){
       element.printColour();
   }
}
);
}

var resetcall = function () {
   beds.forEach(element => {
   if(element.id == resetbed){
       element.setColour("blue");
   }
}
);
beds.forEach(element => {
   if(element.id == resetbed){
       element.printColour();
   }
}
);
}

 function CallEvent(msg) {
    var StringArray = msg.split("");
    if (StringArray[0] == "B") {

      roombedcall = StringArray.slice(1,3);
      rbc = roombedcall.join('')
      console.log("Incoming call from bed " + rbc)
      fillbedred();

    }else                     {
      console.log("Its not a Bed call")
      TIGCOM(msg);
      
   }

 }
 
function TIGCOM(msg) {
   console.log("Comunication from TIG --> " + msg)
   var StringArray = msg.split("");
    if (StringArray[0] !== "B") {
      tigArray = StringArray.slice(0,2);
      tigcom = tigArray.join('')
      console.log("Incoming message from TIG Nº " + tigcom)
      var t = StringArray.slice(2,3);
      tigmsg = t.toString();
      msg="";

      switch (tigmsg) {
         case "A":
           console.log("TIG " + tigcom + " Accept the assistance")
           var tigbed = StringArray.slice(3,5);
           var tigbedreset = tigbed.join('');
           resetbed = tigbedreset.toString();
           console.log("Filling yellow bed " + resetbed)
           fillbedyellow();
           //Change TIG state to busy
           
           break;
         case "D":
            console.log("TIG " + tigcom + " Decline the assistance")
            //Go to somewhere to send again the assistance to another TIG
           break;
         case "T":
            console.log("TIG " + tigcom + " Finish the assistance")
            resetcall();
            //Change TIG state to free
           break;
         default:

           break;
       }
      
    }
   
}

 
 

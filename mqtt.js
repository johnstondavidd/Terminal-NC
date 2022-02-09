
var mqtt;
var client = mqtt.connect("ws://localhost:9001");
var bednum;

function EventoConectar() {
  console.log("Conectado a MQTT");
  client.subscribe("SIGR/+");
  //client.publish("data","B01");
}

var EventoMensaje = function (topic, message) {
  if (topic == "SIGR/bed") {
    bednum = message.toString();
    console.log("Msg recieved from bed " + bednum)
    CallEvent(bednum);
  }

  if (topic == "SIGR/TIGAnswer") {
    msg = message.toString();
    console.log("Msg recieved from TIG " + msg);
    TIGANSWER(msg);
    //const TIG = JSON.parse(msg);
    //console.log("mensaje recibido " + TIG)
    //console.log(TIG.TIGID);
    //console.log(TIG.answer);
    //console.log(TIG.bed);
    //CallEvent(msg);
    //client.end()
    //msg = null;
    //message = null;
  }
}

client.on("connect", EventoConectar);
client.on("message", EventoMensaje);

console.log("Empezando a conectar");
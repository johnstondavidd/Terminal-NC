//MQTT

var mqtt;
var client = mqtt.connect("ws://localhost:9001");
var bednum;
var c = 0;

function EventoConectar() {
  console.log("Conectado a MQTT");
  client.subscribe("SIGR/+");
}

var EventoMensaje = function (topic, message) {
  if (c >= 2) {
    if (topic == "SIGR/bed") {
      bednum = message.toString();
      console.log("Msg recieved from bed " + bednum)
      CallEvent(bednum);
    }

    if (topic == "SIGR/TIGAnswer") {
      msg = message.toString();
      console.log("Msg recieved from TIG " + msg);
      TIGANSWER(msg);
    }

  }
  c = c + 1;
}

client.on("connect", EventoConectar);
client.on("message", EventoMensaje);

console.log("Empezando a conectar");
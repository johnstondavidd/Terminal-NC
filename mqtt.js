
var mqtt;
var client = mqtt.connect("ws://localhost:9001");
var msg;

function EventoConectar() {
  console.log("Conectado a MQTT");
  client.subscribe("data");
  client.publish("data","aaaa");
}

function EventoMensaje(topic, message) {
  if (topic == "data") {
    //console.log(message.toString());
    msg = message;
    console.log("mensaje recibido " + msg)
    CallEvent(msg);
  }
  //console.log(topic + " - " + message.toString());
  //client.end()
}

client.on("connect", EventoConectar);
client.on("message", EventoMensaje);

console.log("Empezando a conectar");
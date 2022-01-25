
var mqtt;
var client = mqtt.connect("ws://localhost:9001");

function EventoConectar() {
  console.log("Conectado a MQTT");
  client.subscribe("data");
}

function EventoMensaje(topic, message) {
  if (topic == "data") {
    console.log(message.toString());
  }
  console.log(topic + " - " + message.toString());
  //client.end()
}

client.on("connect", EventoConectar);
client.on("message", EventoMensaje);

console.log("Empezando a conectar");
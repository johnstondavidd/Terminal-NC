function CallEvent(msg) {
console.log(msg.toString());
//var cadenaVerso = "Hola que tal";
JSON.stringify(msg);
console.log(msg.toString() + typeof(msg));
//dividirCadena(msg);    
}

/*function SplitString(msg, separador) {
    var StringArray = msg.split(separador);
    document.write('<p>La cadena original es: "' + msg + '"');
    document.write('<br>El separador es: "' + separador + '"');
    document.write("<br>El array tiene " + StringArray.length + " elementos: ");
 
    for (var i=0; i < StringArray.length; i++) {
       document.write(StringArray[i] + " / ");
    }

 }*/
 function dividirCadena(cadenaADividir) {
    var separador = " ";
    var arrayDeCadenas = cadenaADividir.split("");
    document.write('<p>La cadena original es: "' + cadenaADividir + '"');
    document.write("<br>El array tiene " + arrayDeCadenas.length + " elementos: ");
 
    for (var i=0; i < arrayDeCadenas.length; i++) {
       document.write(arrayDeCadenas[i] + " / ");
    }
 }
 


 
 

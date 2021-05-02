window.addEventListener ('load', function(){
  
// Declaramos las variables que necesitamos     

var slot0 = document.getElementById("slot0");
var slot1 = document.getElementById("slot1");
var slot2 = document.getElementById("slot2");
var insertButton = document.getElementById("insert");
var spinButton = document.getElementById("spin");
var leaveButton = document.getElementById("leave"); 
var arrayVerduras = ["zanahoria", "aguacate", "ajo", "cebolla", "pepino", "puerro", "tomate"];
var arrayResultados = [];
var arrayHistorialTexto = [];
var arrayHistorialGanancias = [];  
var winnings;

 
// A través del BOTÓN INSERT deshabilitamos la caja y asingamos valor a la variable global apuesta.
function toValidate() {
  
   //Pintar campo "Enter bet" en gris para indicar que la tirada ya se ha hecho con el valor añadido.
  document.getElementById("bet").style.backgroundColor = "grey";
 
  // Declaro la apuesta como variable global para que pueda usarse en las otras funciones:
  betNumber = document.getElementById("bet").value; 
}
 
// A través del BOTÓN SPIN se inactiva la caja de la entrada de apuesta, se llama al random 3 veces y se populan los slots con los resultados.
function toSpin() {

// Si en un futuro creamos un juego de slots con un número distinto de figuras o de slots solo tendremos que cambiar las 2 variables declaradas a continuación. El resto de código de la función se aprovechará sin cambios
 
var numSlots = 3;
var numFiguras= 7;
  
//lamada a los randoms:
for (var i=0; i < numSlots; i++){

  var randomNumber = Math.floor((Math.random() * numFiguras));

  // Añadir valor a la array de Resultados 
  arrayResultados.push(arrayVerduras[randomNumber]);
 
  //Muestro la hortaliza en el div:
  document.getElementById("slot"+i).style.backgroundImage="url('./img/" + arrayVerduras[randomNumber] + ".png')";
  
  } 
  
  
 calcular();
}
 
  
  
  // FUNCION ANIDADA para calcular monedas sengún la apuesta del usuario y los multiplicadores del enunciado.   
function calcular(){
  
  //Primero cuento las zanahorias para facilitar la estructura de control:
  
  var zanahorias= 0;
  for (var i=0; i < arrayResultados.length; i++){  
    if (arrayResultados[i]== "zanahoria")  {zanahorias++}
  }
  
  
  // Volvemos a poner en blanco la caja de la apuesta.
  document.getElementById("bet").style.backgroundColor = "white";
    
 //Empiezo la estructura de control (anidadas) según el número de zanahorias obtenidos:
  
    if (zanahorias==0) 
      {
        if (arrayResultados[0] == arrayResultados[1]) {
              if (arrayResultados[1]==arrayResultados[2]) {winnings = betNumber * 5}}  
        if (arrayResultados[0] == arrayResultados[1]) {
              if (arrayResultados[1]!=arrayResultados[2]) {winnings = betNumber * 2}} 
        if (arrayResultados[0] != arrayResultados[1]) {
              if (arrayResultados[1]==arrayResultados[2] || arrayResultados[0]==arrayResultados[2]) {winnings = betNumber * 2}
              else {winnings=betNumber * 0}}
      }
    
  
    if (zanahorias==1)   
      {      
              if (arrayResultados[0] == arrayResultados[1] || arrayResultados[1]==arrayResultados[2] || arrayResultados[0]==arrayResultados[2] ) {winnings=betNumber * 3}
              else {winnings=betNumber * 1}
      }
  
    
    if (zanahorias==2) {winnings=betNumber * 4} 
    if (zanahorias==3) {winnings=betNumber * 10} 
   
  //Reseteamos la array para la siguiente tirada.
  arrayResultados = [];
  
  
    mostrarResultados();
   
  }
  
 // FUNCION ANIDADA que muestra los resultados de la última partida y también el historial completo de la sesión del jugador.
function mostrarResultados(){
  // Mostrar monedas ganadas en el HTML párrafo para el usuario
  var benefit = winnings - betNumber;
  var verb;
  if (benefit < 0) {verb= "lost"; benefit= benefit*-1;} else {verb="won"};
  var textoResultado = "BET: " + betNumber + " coins || PRIZE: " + winnings + " coins.  --> You " + verb +" "+ benefit + " coins.";
  
  document.getElementById("history").innerHTML= textoResultado;

  // Alimentamos array de resultados de la tirada en curso y también el array del historia de ganancias para luego poder dar el saldo final al judador cuando salga del juego.
  arrayHistorialTexto.push(textoResultado);
  arrayHistorialGanancias.push(benefit);
  
    
  // Mostramos el historial a la salida en forma de lista enumerada
  document.getElementById('history2').innerHTML =
    '<li>'+  arrayHistorialTexto.join('</li><li>') + '</li>';
}

  
  // A través del BOTÓN LEAVE GAME se mostrará el total de ganancias en una ventana emergente, cuando el jugador abandone el juego.
function toLeave() {
  //Recorremos la array que contiene todos los resultados y hacemos sumatorio de los valores:
  var totalBalance=0;
  for (var i=0; i < arrayHistorialGanancias.length; i++){
    totalBalance =  totalBalance + arrayHistorialGanancias[i];
  }
  
  alert("Your current balance is: " + totalBalance + " coins."); 
}
            
  
  
//Llamadas a las funciones al pulsar los tres botones de la web:
insertButton.addEventListener("click", toValidate);
spinButton.addEventListener("click", toSpin);
leaveButton.addEventListener("click", toLeave);
 
 });
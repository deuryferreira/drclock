//FUNCION PARA EL RELOJ
//Imprime el tiempo cada seg
function printTime() {
  var d = new Date();
  var hours = d.getHours();
  var mins = d.getMinutes();
  var secs = d.getSeconds();
  var clock = document.getElementById("clock");

  //formateo de Meridiano AM/PM
  /*if (hours>=12){
      secs+='pm';
    }
    else if (hours<12) {
      secs+='am'
    }*/

  // SISNTAXIS variable = condicion ? valorSiVerdadero : valorSiFalso;
  //[[Formateo de hora con operador ternario ?]]
  secs = secs < 10 ? "0" + secs : secs; //poner cero a segundos
  mins = mins < 10 ? "0" + mins : mins; //poner cero a minutos
  hours = hours > 12 ? hours - 12 : hours; //convertir hora a RD

  clock.innerHTML = `${hours}:${mins}:${secs}`;
}

//HACE QUE SE IMPRIMA EL RELOJ CADA 1SEGUNDO USANDO ***printTime()***
setInterval(printTime, 1000);

//variables de colores y estilos
const fondoAzul =
  "background: linear-gradient(-45deg, #3ac1b8, #2a6edb, #4d4dce, #9443e0); background-size: 400% 400%; animation: gradient 15s ease infinite;";
const fondoRojo =
  "background: linear-gradient(-45deg, #dc811a, #e02576, #b92d23, #9b0303); background-size: 400% 400%; animation: gradient 15s ease infinite;";
const fondoPadeo = "";
const cBlanco = "#fcfcfc";

//FUNCION CAMBIO DE COLOR
function colorChange(cFondo, color) {
  let body = document.querySelector("body");
  let p = document.querySelectorAll("p");
  body.style = cFondo;
  p.forEach(function (texto) {
    texto.style.color = color;
  });
  p.style.color = color;
}

//FUNCION FONDO PARPADEANTE
function colorBlink() {
  let body = document.querySelector("body");
  body.style =
    "background:#0f0f0f ;animation: parpadeo .5s linear infinite; height: 100vh;";
}

//Tiempo por defecto para la funcion de temporizador
const countDownDefault = [10, 0];
var countDownMins = countDownDefault[0];
var countDownSecs = countDownDefault[1];
const xtiempo = document.getElementById("count");

//FUNCION PARA SOLICITAR TIEMPO AL USUARIO (En Minutos):

function setCountdown() {
  var tiempoDefinido = window.prompt("Ingrese el tiempo en minutos:");
  if (tiempoDefinido == null) {
    //evalua qie no sea null
    return;
  }
  while (tiempoDefinido === "") {
    //evalua que no este vacio y luego null
    tiempoDefinido = window.prompt("Texto NO Puede estar Vacio");
    if (tiempoDefinido == null) {
      return;
    }
  }
  countDownMins = tiempoDefinido; //asigna el timpo especificado por el usuario al contador
  countDownMins = countDownMins < 10 ? "0" + countDownMins : countDownMins;
  countDownSecs = countDownSecs < 10 ? "0" + countDownSecs : countDownSecs;

  xtiempo.innerHTML = `${countDownMins}:${countDownSecs}`;
  let countDownContainer = document.getElementById("countdown-container");
  countDownContainer.style.display = "flex";
  return countDownMins;
}

//Definir instanciar el boton play/pausa temporizador y boton Stop
const buttonCount = document.getElementById("button-count");
const buttonStop = document.getElementById("button-stop");
//Definir EventListener para el boton contar y parar
buttonCount.addEventListener("click", startCountdown);
buttonStop.addEventListener("click", stopCountdown);
//---------------------------------------------
function startCountdown() {
  buttonOptionPause();
  const interval = setInterval(() => {
    countDownSecs--; // Decrementar segundos

    if (countDownSecs < 0) {
      countDownSecs = 59; // Reiniciar segundos a 59
      countDownMins--; // Decrementar minutos
    }
    // Verificar si el contador ha alcanzado 0
    if (countDownMins === 0 && countDownSecs === 0) {
      clearInterval(interval);
      tiempoFuera();
    }
    // Actualizar el elemento HTML con el tiempo restante
    countDownSecs = countDownSecs < 10 ? "0" + countDownSecs : countDownSecs;
    var cero = countDownMins < 10 ? 0 : "";
    (xtiempo.innerHTML = `${cero}${countDownMins}:${countDownSecs}`), 1000;

    console.log(`El tiempo es ${countDownMins}:${countDownSecs}`);
  }, 1000); // Actualizar cada segundo (1000 ms)
}

//funcion para pausar cuenta regresiva
function pauseCountdown() {
  window.alert(
    'Cuenta regresiva en pausa. Presione "Aceptar" para reanudar la cuenta regresiva"'
  );
}
//funcion detener cuenta regresiva y poner contador en cero 0
//esta funcion solamete recarga la pagina
function stopCountdown() {
  location.reload();
  xtiempo.innerHTML = "00:00"; //esto no funciona
}

//funcion para poner el boton de iniciar contador en estado de pausa
function buttonOptionPause() {
  buttonCount.innerHTML = " ❙ ❙<br>Pausar";
  buttonCount.style.backgroundColor = "#eff545";
  buttonCount.style.color = "#333";
  buttonCount.removeEventListener("click", startCountdown);
  buttonCount.addEventListener("click", pauseCountdown);
}

//función para cuando se acaba el tiempo
function tiempoFuera() {
  colorBlink();
  let res = document.getElementById("res");
  res.innerHTML = "¡¡SE ACABÓ SU TIEMPO!!";
}

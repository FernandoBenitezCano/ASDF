// Obtener referencias a los elementos del DOM
let body = document.getElementsByTagName("body")[0];
let divDate = document.getElementById("countdownBday");
let title = document.getElementById("title");
let messageTag = document.createElement("h1");
let daysTag = document.getElementById('dias');
let hoursTag = document.getElementById('horas');
let minsTag = document.getElementById('minutos');
let divMain = document.getElementById("divMain");

// Configurar la fecha objetivo del cumpleaños
let goalYear = 2002; // Este es el año de nacimiento (irrelevante para la cuenta regresiva)
let goalMonth = 7; // Agosto (índice basado en cero, así que 7 es agosto)
let goalDay = 10; // Día del mes

// Obtener la fecha actual y inicializar la fecha de cumpleaños para el año actual
let currentDate = new Date();
let birthDayDate = new Date(currentDate.getFullYear(), goalMonth, goalDay); // Corregir la variable de birtdDayDate a birthDayDate

// Variables para almacenar cálculos de tiempo
let days, hours, mins, totalSeconds;

// Crear un intervalo que llama a la función countdown cada segundo
let countdownInterval = setInterval(countdown, 1000);
showSeason(); // Mostrar el fondo de la estación actual
countdown(); // Llamada inicial para actualizar inmediatamente

function countdown() {
  // Actualizar la fecha actual
  currentDate = new Date();

  // Verificar si la fecha actual ha superado la fecha de cumpleaños
  if (currentDate.getTime() > birthDayDate.getTime()) {
    birthDayDate.setFullYear(currentDate.getFullYear() + 1);
  }

  // Calcular el total de segundos restantes hasta el cumpleaños
  totalSeconds = Math.floor((birthDayDate - currentDate) / 1000);

  // Verificar si hoy es el día de cumpleaños (sin considerar la hora)
  if (
    currentDate.getMonth() === birthDayDate.getMonth() &&
    currentDate.getDate() === birthDayDate.getDate()
  ) {
    showMessage();
    daysTag.innerHTML = 0;
    hoursTag.innerHTML = 0;
    minsTag.innerHTML = 0;
    return;
  }

  // Calcular días, horas y minutos restantes
  days = Math.floor(totalSeconds / (3600 * 24));
  hours = Math.floor(totalSeconds / 3600) % 24;
  mins = Math.floor(totalSeconds / 60) % 60;

  // Actualizar los elementos del DOM con los valores calculados
  daysTag.innerHTML = days;
  hoursTag.innerHTML = hours;
  minsTag.innerHTML = mins;
}

function showSeason() {
  let currentMonth = currentDate.getMonth();
  if (currentMonth >= 8 && currentMonth <= 10) {
    body.style.backgroundImage = "URL('pictures/autumn.jpg')";
    body.style.color = "rgb(255,255,255)";
    console.log("autum");
  } else if (currentMonth >= 11 || currentMonth <= 1) {
    body.style.backgroundImage = "URL('pictures/winter.jpg')";
    console.log("winter");
    body.style.color = "rgb(255, 255, 0)";
  } else if (currentMonth >= 2 && currentMonth <= 4) {
    body.style.backgroundImage = "URL('pictures/spring.jpg')";
    console.log("spring");
  } else {
    body.style.backgroundImage = "URL('pictures/summer.jpg')";
    body.style.color = "rgb(255, 111, 5)";
    console.log("summer");
  }
}

function showMessage() {
  // Alternar la visibilidad de los elementos y mostrar el mensaje de felicitación
  divDate.classList.toggle("hide");
  body.style.backgroundImage = "URL('pictures/birthday.jpg')";
  title.classList.toggle("hide");
  body.style.color = "rgb(255,255,255)";

  // Crear el elemento del mensaje y agregarlo al DOM
  messageTag.id = "congratsMessage";
  messageTag.innerText = "¡FELICIDADES!";
  document.querySelector('.container').appendChild(messageTag); // Asegúrate de que el mensaje esté dentro del contenedor
  clearInterval(countdownInterval);

  // Crear el botón "Ver Regalo"
  const giftButton = document.createElement('button');
  giftButton.id = 'giftButton';
  giftButton.innerText = 'Click Aqui';
  giftButton.classList.add('hide'); // Inicialmente oculto

  // Añadir el botón al DOM
  document.querySelector('.container').appendChild(giftButton);

  // Mostrar el botón después de un pequeño retraso para asegurar que se vea correctamente
  setTimeout(() => {
    giftButton.classList.remove('hide');
  }, 100);

  // Configurar el botón para que muestre el regalo (puedes añadir una función aquí)
  giftButton.addEventListener('click', () => {
    window.location.href = 'carta.html';
  });

  // Llamar a la función para crear y soltar el lobo
  dropWolf();
}

function createWolf() {
  // Crear un elemento de imagen de lobo
  let wolf = document.createElement('img');
  wolf.classList.add('wolf');

  // Establecer propiedades de imagen de lobo
  wolf.src = 'pictures/globo.png';
  wolf.style.width = '200px';
  wolf.style.height = '400px';
  wolf.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
  wolf.style.animationDuration = Math.random() * 2 + 3 + "s";

  // Agregar el lobo al cuerpo y eliminarlo después de 4 segundos
  document.body.appendChild(wolf);
  setTimeout(() => {
    wolf.remove();
  }, 4000);
};

function dropWolf() {
  // Establecer un intervalo para crear lobos cada 500ms
  setInterval(createWolf, 500);
}

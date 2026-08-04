//Seleccionamos todas las opciones, iconos del jugador, iconos del programa y simbolos
const choiceButtons = document.querySelectorAll(".choice-btn");
const playerIcons = document.querySelectorAll(".player-icon");
const computerIcons = document.querySelectorAll(".computer-icon");
const simbolos = document.querySelectorAll(".simbol");

const prfWins = document.querySelector(".prf-wins");
const prfLoses = document.querySelector(".prf-loses"); //Seleccionamos las vistas del contador
const prfDraws = document.querySelector(".prf-draws");

// Definimos las opciones del juego, la bandera de procesos y el contador
const OPTIONS = ["gem", "paper", "scissors"];
let isProcessing = false;
let contador = {
  wins: 0,
  loses: 0,
  empates: 0,
};
/**
 * Actualiza el contador y el texto del elemento correspondiente en el DOM.
 * @param {string} result - Resultado de la ronda: "win", "lose" o "draw".
 */
const addContador = (result) => {
  let elemento, clave; // Variables para almacenar el elemento del DOM y la propiedad del contador

  // Determinamos el elemento HTML y la clave del objeto contador según el resultado
  if (result === "win") {
    elemento = prfWins;
    clave = "wins";
  } else if (result === "lose") {
    elemento = prfLoses;
    clave = "loses";
  } else if (result === "draw") {
    elemento = prfDraws;
    clave = "empates";
  } else {
    // Si el resultado no es válido, mostramos error y salimos de la función
    console.error("Resultado no válido:", result);
    return;
  }

  // Verificamos que el elemento exista en el DOM para evitar errores
  if (!elemento) {
    console.error(`Elemento para ${result} no encontrado`);
    return;
  }

  // Incrementamos el contador en la propiedad correspondiente
  contador[clave]++;
  // Actualizamos el texto del elemento con el nuevo valor del contador
  elemento.textContent = contador[clave];
  // console.log(` Este es el resultado ${result}`);
  // prfWins.textContent = "jola"
};

/**
 * Devuelve una opción aleatoria entre "gem", "paper" y "scissors".
 * @returns {string}
 */
function getRandomOption() {
  // Math.floor(Math.random() * longitud) genera un índice entero aleatorio
  return OPTIONS[Math.floor(Math.random() * OPTIONS.length)];
}

/**
 * Restablece el estado visual: oculta iconos, símbolos y quita clases del body.
 */
function resetVisualState() {
  // Ocultamos todos los iconos de la elección del jugador
  playerIcons.forEach((icon) => icon.classList.add("hidden"));
  // Ocultamos todos los iconos de la elección de la computadora
  computerIcons.forEach((icon) => icon.classList.add("hidden"));
  // Ocultamos los símbolos de resultado (✓, ✗, —)
  simbolos.forEach((simb) => simb.classList.add("hidden"));
  // Quitamos las clases de resultado (win, lose, draw) del body
  document.body.classList.remove("win", "lose", "draw");
}

/**
 * Muestra la elección del jugador según el botón presionado.
 * @param {HTMLElement} selectedBtn - El botón que el usuario acaba de clickear.
 * @returns {string|null} La elección del jugador ("gem", "paper", "scissors") o null si no es válida.
 */
function showPlayerChoice(selectedBtn) {
  let playerChoice = null;

  // Averiguamos qué opción representa el botón mediante las clases CSS
  if (selectedBtn.classList.contains("gem")) playerChoice = "gem";
  else if (selectedBtn.classList.contains("paper")) playerChoice = "paper";
  else if (selectedBtn.classList.contains("scissors"))
    playerChoice = "scissors";
  else {
    // Si el botón no tiene una clase válida, mostramos advertencia y devolvemos null
    console.warn("Invalid player choice");
    return null;
  }

  // Ocultamos todos los iconos del jugador
  playerIcons.forEach((icon) => icon.classList.add("hidden"));
  // Mostramos únicamente el icono que corresponde a la elección hecha
  playerIcons.forEach((icon) => {
    if (icon.classList.contains(playerChoice)) {
      icon.classList.remove("hidden");
    }
  });

  // Devolvemos la elección para usarla luego en la lógica del juego
  return playerChoice;
}

/**
 * Anima los iconos de la computadora mostrándolos y ocultándolos cíclicamente.
 * @param {number} delay - Tiempo en milisegundos entre cada cambio de icono.
 */
async function animateComputerIcons(delay = 100) {
  // Repetimos el ciclo completo 5 veces para dar sensación de "ruleta"
  for (let cycle = 0; cycle < 5; cycle++) {
    // Recorremos todos los iconos de la computadora
    for (let i = 0; i < computerIcons.length; i++) {
      const icon = computerIcons[i];
      // Mostramos el icono actual
      icon.classList.remove("hidden");
      // Esperamos el tiempo indicado antes de continuar
      await new Promise((resolve) => setTimeout(resolve, delay));
      // Ocultamos el icono actual
      icon.classList.add("hidden");
      // Volvemos a esperar el mismo tiempo para dar ritmo a la animación
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

/**
 * Selecciona la jugada de la computadora de forma aleatoria y la muestra.
 * @returns {string} La elección de la computadora ("gem", "paper", "scissors").
 */
function showResult() {
  // Obtenemos una opción al azar
  const chosen = getRandomOption();
  // Ocultamos todos los iconos de la computadora
  computerIcons.forEach((icon) => icon.classList.add("hidden"));
  // Mostramos solo el icono que coincide con la elección aleatoria
  computerIcons.forEach((icon) => {
    if (icon.classList.contains(chosen)) {
      icon.classList.remove("hidden");
    }
  });
  // Devolvemos la elección para compararla con la del jugador
  return chosen;
}

/**
 * Determina el resultado de la ronda comparando la elección del jugador y la de la computadora.
 * @param {string} player - Elección del jugador.
 * @param {string} computer - Elección de la computadora.
 * @returns {string} "win", "lose" o "draw".
 */
function getRoundResult(player, computer) {
  let result = ""; // Almacena el resultado textual
  let symbol = ""; // Clase CSS que determina el símbolo a mostrar (check, xmark, minus)
  let bodyClass = ""; // Clase que se agregará al body para cambiar el fondo

  // Empate: ambas opciones son iguales
  if (player === computer) {
    result = "draw";
    symbol = "minus";
    bodyClass = "draw";
  }
  // Victoria del jugador según las reglas clásicas: piedra gana a tijera, papel a piedra, tijera a papel
  else if (
    (player === "gem" && computer === "scissors") ||
    (player === "paper" && computer === "gem") ||
    (player === "scissors" && computer === "paper")
  ) {
    result = "win";
    symbol = "check";
    bodyClass = "win";
  }
  // Cualquier otro caso es derrota
  else {
    result = "lose";
    symbol = "xmark";
    bodyClass = "lose";
  }

  // Mostramos el símbolo correspondiente al resultado
  simbolos.forEach((simb) => {
    if (simb.classList.contains(symbol)) {
      simb.classList.remove("hidden");
    }
  });
  // Agregamos la clase de resultado al body para el efecto visual
  document.body.classList.add(bodyClass);

  // Después de 1.5 segundos ocultamos el símbolo y quitamos la clase del body
  setTimeout(() => {
    simbolos.forEach((simb) => simb.classList.add("hidden"));
    document.body.classList.remove("win", "lose", "draw");
  }, 1500);

  // Devolvemos el resultado para actualizar el contador
  return result;
}

// Asignamos el evento click a cada botón de elección
choiceButtons.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del botón (si fuera un enlace o formulario)
    // Si ya hay una ronda en proceso, salimos sin hacer nada
    if (isProcessing) return;

    // Bloqueamos nuevas interacciones mientras se resuelve la ronda
    isProcessing = true;
    // Limpiamos la interfaz (iconos ocultos, sin colores de resultado)
    resetVisualState();

    // Mostramos la elección del jugador y la guardamos
    const playerChoice = showPlayerChoice(btn);
    // Si por algún motivo no se pudo obtener una elección válida, desbloqueamos y salimos
    if (!playerChoice) {
      isProcessing = false;
      return;
    }

    // Ejecutamos la animación de los iconos de la computadora (ruleta)
    await animateComputerIcons(100);
    // Obtenemos y mostramos la elección definitiva de la computadora
    const computerChoice = showResult();
    // Calculamos el resultado de la ronda
    const result = getRoundResult(playerChoice, computerChoice);
    // Actualizamos el contador de victorias/derrotas/empates
    addContador(result);
    // Mostramos en consola la información de la ronda (para depuración)
    console.log(
      "Player:",
      playerChoice,
      "Computer:",
      computerChoice,
      "Result:",
      result,
    );

    // Después del tiempo de la animación del resultado (1500 ms) volvemos a permitir jugar
    setTimeout(() => {
      isProcessing = false;
    }, 1500);
  });
});

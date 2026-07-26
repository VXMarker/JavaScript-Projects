const options = document.querySelectorAll(".options");

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    e.preventDefault();
    recorrerConPausa(".icon", "disable", 100);
    mostrarOption(option, 2000);
  });
});

async function recorrerConPausa(selector, nombreClase, delay = 500) {
  const elementos = document.querySelectorAll(selector);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < elementos.length; i++) {
      const elemento = elementos[i];
      elemento.classList.remove(nombreClase);

      await new Promise((resolve) => setTimeout(resolve, delay));

      elemento.classList.add(nombreClase);

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

const mostrarOption = (option, intervale) => {
  let selectedClass = null;
  if (option.classList.contains("gem")) {
    selectedClass = "gem";
  } else if (option.classList.contains("paper")) {
    selectedClass = "paper";
  } else if (option.classList.contains("scissors")) {
    selectedClass = "scissors";
  } else {
    console.log("La opción no tiene una clase válida (gem, paper, scissors)");
    return;
  }

  const vIcons = document.querySelectorAll(".vIcon");

  vIcons.forEach((icon) => {
    if (icon.classList.contains(selectedClass)) {
      icon.classList.remove("disable");
      setTimeout(() => {
        icon.classList.add("disable");
      }, intervale);
    }
  });
};

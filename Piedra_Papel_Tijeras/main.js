const choiceButtons = document.querySelectorAll(".choice-btn");
const playerIcons = document.querySelectorAll(".player-icon");
const icons = document.querySelectorAll(".computer-icon");
const playerDisplays = document.querySelectorAll(".display");

let comparador = [];

choiceButtons.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    await showPlayerChoice(btn);
    await animateComputerIcons("hidden", 100);
    await showResult();
  });
});

const opcionRandom = (opciones) => {
  const nRandom = Math.floor(Math.random() * 3);
  const opcion = opciones[nRandom];
  return opcion;
};

async function animateComputerIcons(className, delay = 500) {
  for (let cycle = 0; cycle < 5; cycle++) {
    for (let i = 0; i < icons.length; i++) {
      const icon = icons[i];
      icon.classList.remove(className);

      await new Promise((resolve) => setTimeout(resolve, delay));

      icon.classList.add(className);

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

async function showResult() {
  let selectedClass = null;
  const icon = opcionRandom(icons);
  icon.classList.remove("hidden");

  if (icon.classList.contains("gem")) {
    selectedClass = "gem";
  } else if (icon.classList.contains("paper")) {
    selectedClass = "paper";
  } else if (icon.classList.contains("scissors")) {
    selectedClass = "scissors";
  } else {
    console.warn("Invalid choice class");
    return;
  }
  comparador.push(selectedClass);
  console.log(comparador);
  
}

function showPlayerChoice(selectedBtn) {
  let selectedClass = null;
  if (selectedBtn.classList.contains("gem")) {
    selectedClass = "gem";
  } else if (selectedBtn.classList.contains("paper")) {
    selectedClass = "paper";
  } else if (selectedBtn.classList.contains("scissors")) {
    selectedClass = "scissors";
  } else {
    console.warn("Invalid choice class");
    return;
  }

  playerIcons.forEach((icon) => {
    if (icon.classList.contains("hidden")) {
      if (icon.classList.contains(selectedClass)) {
        icon.classList.remove("hidden");
      }
    } else {
      icon.classList.add("hidden");
    }
  });

  comparador.push(selectedClass);
  console.log(comparador);
  
}

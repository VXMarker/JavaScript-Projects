const choiceButtons = document.querySelectorAll(".choice-btn");
const playerIcons = document.querySelectorAll(".player-icon");
const computerIcons = document.querySelectorAll(".computer-icon");
const simbolos = document.querySelectorAll(".simbol");

const OPTIONS = ["gem", "paper", "scissors"];

let isProcessing = false;

function getRandomOption() {
  return OPTIONS[Math.floor(Math.random() * OPTIONS.length)];
}

function resetVisualState() {
  playerIcons.forEach((icon) => icon.classList.add("hidden"));
  computerIcons.forEach((icon) => icon.classList.add("hidden"));
  simbolos.forEach((simb) => simb.classList.add("hidden"));
  document.body.classList.remove("win", "lose", "draw");
}

function showPlayerChoice(selectedBtn) {
  let playerChoice = null;
  if (selectedBtn.classList.contains("gem")) playerChoice = "gem";
  else if (selectedBtn.classList.contains("paper")) playerChoice = "paper";
  else if (selectedBtn.classList.contains("scissors"))
    playerChoice = "scissors";
  else {
    console.warn("Invalid player choice");
    return null;
  }

  playerIcons.forEach((icon) => icon.classList.add("hidden"));
  playerIcons.forEach((icon) => {
    if (icon.classList.contains(playerChoice)) {
      icon.classList.remove("hidden");
    }
  });

  return playerChoice;
}

async function animateComputerIcons(delay = 100) {
  for (let cycle = 0; cycle < 5; cycle++) {
    for (let i = 0; i < computerIcons.length; i++) {
      const icon = computerIcons[i];
      icon.classList.remove("hidden");
      await new Promise((resolve) => setTimeout(resolve, delay));
      icon.classList.add("hidden");
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

function showResult() {
  const chosen = getRandomOption();
  computerIcons.forEach((icon) => icon.classList.add("hidden"));
  computerIcons.forEach((icon) => {
    if (icon.classList.contains(chosen)) {
      icon.classList.remove("hidden");
    }
  });
  return chosen;
}

function getRoundResult(player, computer) {
  let result = "";
  let symbol = "";
  let bodyClass = "";

  if (player === computer) {
    result = "draw";
    symbol = "minus";
    bodyClass = "draw";
  } else if (
    (player === "gem" && computer === "scissors") ||
    (player === "paper" && computer === "gem") ||
    (player === "scissors" && computer === "paper")
  ) {
    result = "win";
    symbol = "check";
    bodyClass = "win";
  } else {
    result = "lose";
    symbol = "xmark";
    bodyClass = "lose";
  }

  simbolos.forEach((simb) => {
    if (simb.classList.contains(symbol)) {
      simb.classList.remove("hidden");
    }
  });
  document.body.classList.add(bodyClass);

  setTimeout(() => {
    simbolos.forEach((simb) => simb.classList.add("hidden"));
    document.body.classList.remove("win", "lose", "draw");
  }, 1500);

  return result;
}

choiceButtons.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (isProcessing) return;

    isProcessing = true;
    resetVisualState();

    const playerChoice = showPlayerChoice(btn);
    await animateComputerIcons(100);
    const computerChoice = showResult();
    const result = getRoundResult(playerChoice, computerChoice);

    console.log(
      "Player:",
      playerChoice,
      "Computer:",
      computerChoice,
      "Result:",
      result,
    );

    setTimeout(() => {
      isProcessing = false;
    }, 1500);
  });
});

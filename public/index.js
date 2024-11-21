let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let tries = 0; // Initialize tries

async function initGame() {
  const response = await fetch("/cards");
  cards = await response.json();
  renderCards();
  document.getElementById('celebration-overlay').classList.remove('visible');
  tries = 0; // Reset tries at the start of the game
  updateTriesDisplay(); // Update tries display
}

function renderCards() {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  cards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.dataset.index = index;
    cardElement.addEventListener("click", flipCard);
    gameBoard.appendChild(cardElement);
  });
}

function flipCard() {
  if (flippedCards.length === 2) return;
  const index = parseInt(this.dataset.index);
  if (cards[index].matched || flippedCards.includes(index)) return;

  this.classList.add("flipped");
  this.style.backgroundImage = `url(${cards[index].image})`;
  flippedCards.push(index);

  if (flippedCards.length === 2) {
    tries++; // Increment tries when two cards are flipped
    updateTriesDisplay(); // Update tries display
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [index1, index2] = flippedCards;
  const card1 = cards[index1];
  const card2 = cards[index2];

  if (card1.id === card2.id) {
    card1.matched = true;
    card2.matched = true;
    matchedPairs++;

    document
      .querySelector(`.card[data-index="${index1}"]`)
      .classList.add("matched");
    document
      .querySelector(`.card[data-index="${index2}"]`)
      .classList.add("matched");

    if (matchedPairs === cards.length / 2) {
      celebrateWin();
    }
  } else {
    const flippedElements = document.querySelectorAll(
      ".card.flipped:not(.matched)"
    );
    flippedElements.forEach((element) => {
      element.classList.remove("flipped");
      element.style.backgroundImage = "";
    });
  }

  flippedCards = [];
}

function celebrateWin() {
  const overlay = document.getElementById("celebration-overlay");
  overlay.classList.add('visible');
  overlay.style.opacity = "1";

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });

  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}

// Update the tries display
function updateTriesDisplay() {
  const triesDisplay = document.getElementById("tries-display");
  if (triesDisplay) {
    triesDisplay.textContent = `Tries: ${tries}`;
  }
}

// document.getElementById("restart-btn").addEventListener("click", initGame);

initGame();

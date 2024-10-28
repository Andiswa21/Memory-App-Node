let deck = [];
let firstCard = null;
let secondCard = null;
const gameBoard = document.getElementById('game-board');
const winPopup = document.getElementById('win-popup');
let previewing = true; // Flag to control initial preview
let lockBoard = false;  // Prevent multiple card clicks during processing

// Load and render a new game
async function startGame() {
  const response = await fetch('/new-game');
  deck = await response.json();
  previewCards(); // Show cards initially for preview
}

// Function to preview all cards for 6 seconds
function previewCards() {
  previewing = true;
  renderGameBoard(); // Show all cards
  setTimeout(() => {
    previewing = false;
    renderGameBoard(); // Hide cards after preview
  }, 6000); // 6-second delay
}

// Render cards on the game board
function renderGameBoard() {
  gameBoard.innerHTML = '';
  deck.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.index = index;
    cardElement.addEventListener('click', () => selectCard(index));

    // Show card ID during preview or if card is matched or selected
    if (previewing || card.matched || card === firstCard || card === secondCard) {
      cardElement.textContent = card.id;
    } else {
      cardElement.textContent = ''; // Hide content if not matched or selected
    }
    gameBoard.appendChild(cardElement);
  });
}

// Handle card selection and matching logic
async function selectCard(index) {
  if (previewing || lockBoard || deck[index] === firstCard || deck[index].matched) return; // Disable clicks during preview, on lock, or if selecting the same card

  const selectedCard = deck[index];
  if (!firstCard) {
    firstCard = selectedCard;
  } else if (!secondCard) {
    secondCard = selectedCard;
    lockBoard = true; // Lock the board while checking for a match

    const response = await fetch('/check-match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstCard, secondCard }),
    });
    const { match, deck: updatedDeck } = await response.json();
    deck = updatedDeck;

    if (match) {
      firstCard = secondCard = null; // Reset selections if match is found
      checkWin();
    } else {
      setTimeout(() => {
        firstCard = secondCard = null; // Reset selections after delay if no match
        renderGameBoard();
      }, 1000);
    }
    lockBoard = false; // Unlock board after checking
  }
  renderGameBoard();
}

// Check if all cards are matched to display winning message
function checkWin() {
  if (deck.every(card => card.matched)) {
    winPopup.style.display = 'block';
  }
}

// Reset the game
function resetGame() {
  winPopup.style.display = 'none';
  startGame();
}

// Initialize the game on page load
document.addEventListener('DOMContentLoaded', startGame);

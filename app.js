const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.json());

// Function to generate and shuffle the deck
function generateDeck() {
  const deck = [];
  for (let i = 1; i <= 18; i++) {
    deck.push({ id: i, matched: false }, { id: i, matched: false });
  }
  return deck.sort(() => Math.random() - 0.5);
}

// Initial deck setup
let deck = generateDeck();

// API to reset the game and shuffle cards
app.get('/new-game', (req, res) => {
  deck = generateDeck();
  res.json(deck);
});

// Endpoint to check if two selected cards match
app.post('/check-match', (req, res) => {
  const { firstCard, secondCard } = req.body;
  const match = firstCard.id === secondCard.id;
  if (match) {
    deck = deck.map(card =>
      card.id === firstCard.id ? { ...card, matched: true } : card
    );
  }
  res.json({ match, deck });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

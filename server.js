const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/cards", (req, res) => {
  const cards = JSON.parse(fs.readFileSync("./data/cards.json", "utf8"));
  const shuffledCards = shuffleCards([...cards, ...cards]);
  res.json(shuffledCards);
});


function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

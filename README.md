# Card Guessing Game

A fun and interactive memory game built with Node.js and vanilla JavaScript. Players flip cards to find matching pairs, with a celebratory confetti animation upon winning.

## Features

- 6x6 grid of cards (18 pairs to match)
- Randomized card positions for each new game
- Interactive card flipping with smooth animations
- Match checking logic
- Win detection with a celebratory confetti animation
- Responsive design for various screen sizes

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine
- npm (Node Package Manager) installed

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/MandlakheM/nodeJs-memoryCardGame.git
   ```

2. Navigate to the project directory:
   ```
   cd nodeJs-memoryCardGame
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Running the Game

1. Start the server:
   ```
   npm start
   ```

2. Open your web browser and go to:
   ```
   http://localhost:3000
   ```

## How to Play

1. Click on a card to flip it over.
2. Click on another card to try and find its match.
3. If the cards match, they will remain face-up.
4. If the cards don't match, they will flip back over.
5. Continue until all pairs are matched.
6. When all pairs are matched, enjoy the victory celebration!
7. Click the "Play Again" button to start a new game.

## Project Structure

- `index.js`: Main server file
- `public/index.html`: Main game page
- `public/img/`: Directory containing card images
- `cards.json`: JSON file containing card data

## Customization

To customize the game:

1. Replace the card images in the `public/img/` directory with your own images.
2. Update the `cards.json` file to reflect your new card data.
3. Modify the CSS in `public/index.html` to change the game's appearance.

## Contributing

Contributions to the Card Guessing Game are welcome. Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments

- Confetti animation powered by [canvas-confetti](https://github.com/catdad/canvas-confetti)

- # Deployed version
- ``https://memory-app-node-1.onrender.com/

import { useState, useEffect } from "react";
//images linked to incorrect guesses
import imagesArray from "./imagesArray.js";
import alphabet from "./alphabet";

function Game() {
  //fetching words from dictionary.json file
  const WORDS = require("../dictionary.json");
  fetch(WORDS)
    .then((response) => response.text())
    .then((text) => this.setState({ text }));

  //setting state for 5 constants
  //picking a random word from from dictionary.json file
  const [word, setWord] = useState(
    WORDS[Math.floor(Math.random() * WORDS.length)]
  );
  const [guesses, setGuesses] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  //function triggered when clicking on a letter button- updates state or increases no. of incorrect guesses
  const handleGuess = (guess) => {
    if (gameOver) return;
    if (guesses.includes(guess)) return;

    if (word.includes(guess)) {
      setGuesses([...guesses, guess]);
    } else {
      setIncorrectGuesses(incorrectGuesses + 1);
    }
  };
  //game is over if the number of incorrect guesses is 10
  useEffect(() => {
    if (incorrectGuesses >= 10) {
      setGameOver(true);
      setWon(false);
    }

    if (word.split("").every((letter) => guesses.includes(letter))) {
      setGameOver(true);
      setWon(true);
    }
  }, [incorrectGuesses, word, guesses]);

  //a function linked to a button to re-set the game once lost/won
  const resetGame = () => {
    setWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    setGuesses([]);
    setIncorrectGuesses(0);
    setGameOver(false);
    setWon(false);
  };

  return (
    <div>
      {/* this section appears only at the end of the game when user lost or won and can re-set the game */}
      {gameOver ? (
        <div>
          <p>Winning word: {word}</p>
          {won ? `You won!` : `You lost!`}
          {<button onClick={() => resetGame()}>Play Again!</button>}
        </div>
      ) : (
        <div>
          <p className="incorrect">Incorrect guesses: {incorrectGuesses}</p>
          <p className="guess">
            {word
              .split(``)
              .map((letter) => (guesses.includes(letter) ? letter : ` _ `))}
          </p>
          {/* buttons with all letters of the alphabet */}
          <p>
            {alphabet.split(``).map((letter) => (
              <button key={letter} onClick={() => handleGuess(letter)}>
                {letter}
              </button>
            ))}
          </p>
          {/* links images to the number of incorrect guesses */}
          {incorrectGuesses > 0 && (
            <img alt="" src={imagesArray[incorrectGuesses]}></img>
          )}
        </div>
      )}
    </div>
  );
}

export default Game;

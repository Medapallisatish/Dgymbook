import React, { useState } from "react";
import "./App.css";
import "animate.css";
import { BsMoonStars } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";
import { MdRestartAlt } from "react-icons/md";
import { BsPatchQuestion } from "react-icons/bs";
import Popup from "reactjs-popup"



const WORD_LIST = ["apple", "grape", "table", "chair", "house"];
const getRandomWord = () => WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

const Wordle = () => {
  const [targetWord, setTargetWord] = useState(getRandomWord());
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(6);
  const [gameOver, setGameOver] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const checkGuess = (guess) => {
    return guess.split("").map((char, index) => {
      if (char === targetWord[index]) return "green";
      if (targetWord.includes(char)) return "yellow";
      return "gray";
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentGuess.length !== 5 || gameOver) return;
    
    const feedback = checkGuess(currentGuess);
    const newGuesses = [...guesses, { word: currentGuess, feedback }];
    setGuesses(newGuesses);
    setCurrentGuess("");
    
    if (currentGuess === targetWord) {
      setGameOver(true);
    } else if (attemptsLeft - 1 === 0) {
      setGameOver(true);
    }
    
    setAttemptsLeft(attemptsLeft - 1);
  };

  const handleRestart = () => {
    setTargetWord(getRandomWord());
    setGuesses([]);
    setCurrentGuess("");
    setAttemptsLeft(6);
    setGameOver(false);
  };

  return (
    <div className={`wordle-container ${darkMode ? "dark" : "light"}`}>
      <div className="container">
        
        <Popup trigger={<span className="inst">        <BsPatchQuestion className="note"/>
          </span>}>
  <div className="flow"> 
    <h3 style={{textAlign:"Center", textDecoration:"Underline"}}>How to play</h3>
    The game presents a 5x6 grid where you can enter your guesses.
    You have 6 attempts to guess the correct 5-letter word.
    Enter a Guess

    Type a valid 5-letter word using the on-screen keyboard or your keyboard.
    Press Enter to submit your guess.
    Check the Feedback

    After submitting, the grid updates with color-coded feedback:

    🟩 Green → Correct letter in the correct position.
    🟨 Yellow → Correct letter in the wrong position.
    ⬜ Gray → Incorrect letter, not in the word.
  </div>
</Popup>
      <h1 style={{marginLeft:170, fontSize:45}}>W<span className="span">o</span>rdle Cl<span className="span2">o</span>ne</h1>
      <div>
      <button onClick={handleRestart} className="restart"><MdRestartAlt/> New Game</button>
      <span onClick={() => setDarkMode(!darkMode)} className="toggle-dark">{darkMode ? (<IoSunnyOutline className="sun"/>) : (<BsMoonStars className="moon"/>)}</span>

      </div>
      
      </div>
      <hr/>

      <div className="grid">
        <div className="gameplay">

</div>

        {guesses.map(({ word, feedback }, i) => (
          <div key={i} className="row animate__animated animate__fadeIn">
            {word.split("").map((char, j) => (
              <span key={j} className={`cell ${feedback[j]} animate__animated animate__flipInX`}>{char}</span>
            ))}
          </div>
        ))}
      </div>
      {!gameOver && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={currentGuess}
            maxLength="5"
            onChange={(e) => setCurrentGuess(e.target.value.toLowerCase())}
            disabled={gameOver}
            className="input"
          />
          <button type="submit" className="submit">Submit</button>
        </form>
      )}
      {gameOver && <p>{currentGuess === targetWord ? "You Win!" : `Game Over! The word was " ${targetWord}"`}</p>}
    </div>
  );
};

export default Wordle;
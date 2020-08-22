import React, { useState, useEffect, useCallback } from "react";
import words from "./words";
import { GAME_STATUS } from "./constants";

import "./styles.css";
import WinLost from "./components/WinLost";
import Welcome from "./components/Welcome/";
import Game from "./components/Game/Game";

export default function App() {
  const [wordToGuess, setWordToGuess] = useState([]);
  const [userWord, setUserWord] = useState([]);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.INITIAL);

  const getRandomWord = useCallback(() => {
    return words.english[
      Math.floor(Math.random() * words.english.length)
    ].split("");
  }, []);

  const setRandomWord = useCallback(() => {
    const randomWord = getRandomWord();

    setWordToGuess(randomWord);
    setUserWord(new Array(randomWord.length).fill(""));
  }, [setWordToGuess, setUserWord, getRandomWord]);

  useEffect(() => {
    setRandomWord();
  }, [setRandomWord]);

  function tryAgain() {
    setRandomWord();
    setGameStatus(GAME_STATUS.STARTED);
  }

  return (
    <div className="root">
      <div className="title">
        <h1>Hangman</h1>
      </div>
      {gameStatus === GAME_STATUS.INITIAL ? (
        <Welcome onStart={() => setGameStatus(GAME_STATUS.STARTED)} />
      ) : null}
      {gameStatus === GAME_STATUS.STARTED ? (
        <Game
          wordToGuess={wordToGuess}
          userWord={userWord}
          setUserWord={setUserWord}
          setGameStatus={(status) => setGameStatus(status)}
        />
      ) : null}
      {gameStatus === GAME_STATUS.WON || gameStatus === GAME_STATUS.LOST ? (
        <WinLost
          wordToGuess={wordToGuess}
          gameStatus={gameStatus}
          tryAgain={tryAgain}
        />
      ) : null}
    </div>
  );
}

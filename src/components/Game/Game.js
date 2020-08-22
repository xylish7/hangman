import React, { useState } from "react";
import PropTypes from "prop-types";
import { GAME_STATUS, LIVES } from "../../constants";
import { mdiHeart, mdiHeartBroken } from "@mdi/js";
import Icon from "@mdi/react";

import styles from "./Game.module.css";
import Keyboard from "../Keyboard";

export default function Game(props) {
  const { wordToGuess, userWord, setUserWord, setGameStatus } = props;

  const [lives, setLives] = useState(LIVES);
  const [goodLetters, setGoodLetters] = useState([]);
  const [badLetters, setBadLetters] = useState([]);

  function onLetterPressed(letter) {
    const clonedUserWord = [...userWord];

    let letterFound = false;
    wordToGuess.forEach((wordLetter, index) => {
      if (wordLetter === letter) {
        clonedUserWord[index] = letter;
        letterFound = true;
      }
    });

    if (!letterFound && lives !== 0 && !badLetters.includes(letter)) {
      if (lives === 1) {
        return setGameStatus(GAME_STATUS.LOST);
      } else {
        setLives(lives - 1);
        setBadLetters([...badLetters, letter]);
      }
    } else {
      setGoodLetters([...goodLetters, letter]);
    }

    if (clonedUserWord.indexOf("") === -1) {
      return setGameStatus(GAME_STATUS.WON);
    }
    setUserWord(clonedUserWord);
  }

  return (
    <div className={styles["root"]}>
      <div className={styles["word"]}>
        {userWord.map((letter, index) => (
          <p className={styles["word-letter"]} key={index} type="text">
            {letter}
          </p>
        ))}
      </div>
      <div className={styles["lives-container"]}>
        {new Array(LIVES - lives).fill(0).map((el, index) => (
          <Icon key={index} path={mdiHeartBroken} size={1} color="#FF3860" />
        ))}
        {new Array(lives).fill(0).map((el, index) => (
          <Icon key={index} path={mdiHeart} size={1} color="#FF3860" />
        ))}
      </div>
      <div className={styles["keyboard-container"]}>
        <Keyboard
          onLetterPressed={onLetterPressed}
          goodLetters={goodLetters}
          badLetters={badLetters}
        />
      </div>
    </div>
  );
}

Game.propTypes = {
  wordToGuess: PropTypes.array.isRequired,
  userWord: PropTypes.array.isRequired,
  setUserWord: PropTypes.func.isRequired,
  setGameStatus: PropTypes.func.isRequired
};

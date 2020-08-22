import React from "react";
import PropTypes from "prop-types";

import styles from "./Keyboard.module.css";
import { KEYBOARDS } from "../../constants";

export default function Keyboard(props) {
  const { language, goodLetters, badLetters, onLetterPressed } = props;

  function createLetterClass(letter) {
    if (goodLetters.includes(letter))
      return `${styles["letter"]} ${styles["good"]}`;
    if (badLetters.includes(letter))
      return `${styles["letter"]} ${styles["bad"]}`;

    return `${styles["letter"]}`;
  }

  function isDisabled(letter) {
    return goodLetters.includes(letter) || badLetters.includes(letter);
  }

  return (
    <div className={styles["root"]}>
      {KEYBOARDS[language].map((row, index) => (
        <div key={index} className={styles["row"]}>
          {row.map((letter) => {
            return (
              <button
                disabled={isDisabled(letter)}
                key={letter}
                onClick={() => onLetterPressed(letter)}
                className={createLetterClass(letter)}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

Keyboard.propTypes = {
  language: PropTypes.string,
  goodLetters: PropTypes.array,
  badLetters: PropTypes.array,
  onLetterPressed: PropTypes.func.isRequired
};

Keyboard.defaultProps = {
  badLetters: [],
  goodLetters: [],
  language: "english"
};

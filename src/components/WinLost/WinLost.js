import React from "react";
import PropTypes from "prop-types";

import styles from "./WinLost.module.css";
import { mdiPartyPopper, mdiEmoticonSadOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { GAME_STATUS } from "../../constants";
import Button from "../../shared/Button/Button";

export default function WinLost(props) {
  const { wordToGuess, gameStatus, tryAgain } = props;

  const message =
    gameStatus === GAME_STATUS.WON
      ? "Congratulations! The guessed word was "
      : "You've lost. The word was ";

  const icon =
    gameStatus === GAME_STATUS.WON ? mdiPartyPopper : mdiEmoticonSadOutline;

  function _renderWordToGuess() {
    return (
      <span className={styles["word-to-guess"]}>
        {wordToGuess.join("").toUpperCase()}
      </span>
    );
  }

  return (
    <div className={styles.root}>
      <p>
        {message}
        {_renderWordToGuess()}
      </p>
      <Icon path={icon} size={4} color="#00d1b2" />
      <p>Feel free to try again!</p>
      <div style={{ marginTop: 32 }}>
        <Button onClick={tryAgain}> Play again</Button>
      </div>
    </div>
  );
}

WinLost.propTypes = {
  wordToGuess: PropTypes.array.isRequired,
  gameStatus: PropTypes.string.isRequired,
  tryAgain: PropTypes.func.isRequired
};

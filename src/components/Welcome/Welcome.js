import React from "react";
import PropTypes from "prop-types";
import Button from "../../shared/Button/Button";

import styles from "./Welcome.module.css";

export default function Welcome(props) {
  const { onStart } = props;

  return (
    <div className={styles["root"]}>
      <p className={styles["message"]}>
        Welcome to Hangman. Just press "Start game" to play!
      </p>
      <Button onClick={onStart}>Start game</Button>
    </div>
  );
}

Welcome.propTypes = {
  onStart: PropTypes.func.isRequired
};

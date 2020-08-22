import React, { useState, useEffect } from "react";

import styles from "./ThemeToggler.module.css";
import { THEME } from "../constants";

export default function ThemeToggler(props) {
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => document.body.classList.add(THEME.DARK), []);

  function changeTheme(value) {
    switch (value) {
      case true:
        document.body.className = THEME.LIGHT;
        break;
      case false:
        document.body.className = THEME.DARK;
        break;
      default:
        break;
    }

    setCheckbox(value);
  }

  return (
    <div className={styles.root}>
      <label className={styles.switch}>
        <input
          className={styles["checkbox-input"]}
          type="checkbox"
          checked={checkbox}
          onChange={(e) => changeTheme(e.target.checked)}
        />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
}

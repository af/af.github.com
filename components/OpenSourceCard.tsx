import React from "react";
import styles from "./OpenSourceCard.module.css";

export default function OpenSourceCard() {
  return (
    <li className={styles.main}>
      <a className={styles.loading}>
        <div className={styles.stars}></div>
        <h3 className={styles.title}>...</h3>
        <div className={styles.description}>...</div>
      </a>
    </li>
  );
}


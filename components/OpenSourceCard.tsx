import React from "react";
import styles from "./OpenSourceCard.module.css";
import type { GitHubRepo } from "./types";

type Props = {
  repo?: GitHubRepo;
};

export default function OpenSourceCard({ repo }: Props) {
  if (!repo) {
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

  return (
    <li className={styles.main}>
      <a href={repo.html_url}>
        <div className={styles.stars}>{repo?.stargazers_count}</div>
        <h3 className={styles.title}>{repo.name}</h3>
        <div className={styles.description}>{repo.description}</div>
      </a>
    </li>
  );
}

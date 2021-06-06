import React from "react";
import styles from "./SidebarLinks.module.css";

type Props = {
  links: Array<any>;
};

const SidebarLinks = ({ links }: Props) => {
  const latestLinks = links.slice(0, 10);
  const contents = latestLinks.map((l) => (
    <article className={styles.item}>
      <h1>
        <a href={l.u}>{l.d}</a>
      </h1>
      <blockquote>{l.n}</blockquote>
      <ul className={styles.tags}>
        {l.t.map((tag: string) => (
          <li>
            <a
              className={`tag-${tag}`}
              href={`https://pinboard.in/u:_af/t:${tag}`}
            >
              {tag}
            </a>
          </li>
        ))}
      </ul>
      <time>{l.dt.split("T")[0]}</time>
    </article>
  ));

  return <section className={styles.main}>{contents}</section>;
};

export default SidebarLinks;

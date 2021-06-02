import React from "react";
import styles from "./PostFooter.module.css";
import PostListItem from "./PostListItem";
import type { Post } from "../lib/api";

type Props = {
  latestPosts: Array<Post>;
};

const PostFooter = ({ latestPosts }: Props) => (
  <footer className={styles.main}>
    <div className={styles.feedback}>
      <p>
        Thanks for reading. If you made it this far, you might want to{" "}
        <a href="/atom.xml">subscribe for future posts</a>
      </p>

      <p>
        Feedback? Please file an issue or{" "}
        <a href="https://www.github.com/af/af.github.com">
          send a pull request
        </a>
      </p>
    </div>

    <section className={styles.latest}>
      <header className={styles.sectionHeading}>
        <h2>Latest Posts</h2>
        <a href="/posts" className={styles.moreLink}>
          More Posts
        </a>
      </header>

      {latestPosts.map((p) => (
        <PostListItem post={p} key={p.url} />
      ))}
    </section>
  </footer>
);

export default PostFooter;

import React from "react";
import styles from "./PostFooter.module.css";

const PostFooter = ({ post, latestPosts }) => (
  <footer className={styles.main}>
    <p>
      Thanks for reading. If you made it this far, you might want to
      <a href="/atom.xml">subscribe for future posts</a>
    </p>

    <p>
      Feedback? Please file an issue or
      <a href="https://www.github.com/af/af.github.com">send a pull request</a>
    </p>

    <section className={styles.latest}>
      <header className="sectionHeading">
        <h2>Latest Posts</h2>
        <a href="/posts" className="more">
          More Posts
        </a>
      </header>

      {latestPosts.map((p) => (
        <div className={styles.post} key={p.url}>
          <time>{post.date}</time>
          <a href={post.url}>{post.title}</a>
        </div>
      ))}
    </section>
  </footer>
);

export default PostFooter;

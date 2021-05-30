import React from "react";
import styles from "./PostListItem.module.css";

// FIXME
//post.date | date("YYYY-MM-DD")
const formatDate = (date) => date;

const approximateReadTime = (chars: string) => {
  if (!chars || !chars.length) return "";
  return Math.floor(chars.length / 1200);
};

const PostListItem = ({ post }) => (
  <article className={styles.postListItem}>
    <time>{formatDate(post.date)}</time>
    <div>
      <h1>
        <a href={post.url}>{post.title}</a>
      </h1>
      <div className="readTime">
        {approximateReadTime(post.content)} minute read
      </div>
    </div>
  </article>
);

export default PostListItem;

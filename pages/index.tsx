import Head from "next/head";

import { getAllPosts } from "../lib/api";
import Header from "../components/Header";
import Layout from "../components/Layout";
import PostListItem from "../components/PostListItem";
import styles from "./Homepage.module.css";

export default function Index({ allPosts }) {
  const latestPosts = allPosts.slice(0, 3);
  return (
    <>
      <Layout>
        <Head>
          <title>TODO min site title</title>
        </Head>

        <Header />

        <div className="container">
          <p className={styles.hello}>
            Hi 👋 I’m a software engineer with interests in user interfaces,
            data visualization, and functional programming.
          </p>
        </div>

        <section className="openSource container">
          <header className={styles.sectionHeading}>
            <h2>Latest Open Source Projects</h2>
            <a href="https://github.com/af" className="more">
              More on Github
            </a>
          </header>

          <ol className="ossProjects">
            {[1, 2, 3, 4, 5, 6].map((x) => (
              <li key={x}>
                <a className="loading">
                  <div className="projectStars"></div>
                  <h3 className="projectTitle">...</h3>
                  <div className="projectDesc">...</div>
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className="blogPosts container">
          <header className={styles.sectionHeading}>
            <h2>(Infrequent) Blog Posts</h2>
            <a href="/posts" className="more">
              More Posts
            </a>
          </header>

          {latestPosts.map((p) => (
            <PostListItem post={p} />
          ))}
        </section>

        <header className={`${styles.sectionHeading} container`}>
          <h2>Links from around the web</h2>
          <a href="https://pinboard.in/u:_af" className="more">
            More on Pinboard
          </a>
        </header>
        <div className="timeline container">
          <svg className="timelineChart" width="350" height="1400">
            <g className="categoryAxis"></g>
            <g className="yearAxis"></g>
            <g className="monthAxis"></g>
            <g className="bubbleRoot"></g>
          </svg>

          <section>
            <div className="latestLinks"></div>
          </section>
        </div>

        <footer>&nbsp;</footer>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { allPosts: getAllPosts() },
  };
}

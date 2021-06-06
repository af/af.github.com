import React, { useEffect, useState } from "react";
import Head from "next/head";

import { getAllPosts, Post } from "../lib/api";
import Layout from "../components/Layout";
import OpenSourceCard from "../components/OpenSourceCard";
import PostListItem from "../components/PostListItem";
import SidebarLinks from "../components/SidebarLinks";
import LinksTimeline from "../components/Timeline";
import styles from "./Homepage.module.css";

type Props = {
  allPosts: Array<Post>;
};

export default function Homepage({ allPosts }: Props) {
  const [links, setLinks] = useState([]);
  useEffect(() => {
    // @ts-expect-error global hackery
    window._linksPromise.then((links) => setLinks(links));
  }, []);

  const latestPosts = allPosts.slice(0, 3);
  return (
    <>
      <Layout>
        <Head>
          <title>TODO min site title</title>
          <meta
            name="keywords"
            content="Aaron Franks, programming, software, Victoria"
          />
        </Head>

        <div className="container">
          <p className={styles.hello}>
            Hi 👋 I’m a software engineer with interests in user interfaces,
            data visualization, and functional programming.
          </p>
        </div>

        <section className="openSource container">
          <header className={styles.sectionHeading}>
            <h2>Latest Open Source Projects</h2>
            <a href="https://github.com/af" className={styles.moreLink}>
              More on Github
            </a>
          </header>

          <ol className={styles.openSource}>
            {[1, 2, 3, 4, 5, 6].map((x) => (
              <OpenSourceCard key={x} />
            ))}
          </ol>
        </section>

        <section className="blogPosts container">
          <header className={styles.sectionHeading}>
            <h2>(Infrequent) Blog Posts</h2>
            <a href="/posts" className={styles.moreLink}>
              More Posts
            </a>
          </header>

          {latestPosts.map((p) => (
            <PostListItem post={p} key={p.title} />
          ))}
        </section>

        <header className={`${styles.sectionHeading} container`}>
          <h2>Links from around the web</h2>
          <a href="https://pinboard.in/u:_af" className={styles.moreLink}>
            More on Pinboard
          </a>
        </header>
        <div className={`${styles.timeline} container`}>
          <LinksTimeline links={links} />
          <SidebarLinks links={links} />
        </div>

        <footer>&nbsp;</footer>
      </Layout>

      {/*
      Load pinboard links and GH repos (via their jsonp callback) into Promises
      */}
      <div
        dangerouslySetInnerHTML={{
          __html: `
      <script>
      window._linksPromise = new Promise((resolve, reject) => {
          window.linksCb = (links => resolve(links))
      })
      window._reposPromise = new Promise((resolve, reject) => {
          window.reposCb = (repos => resolve(repos))
      })
      </script>
      <script src="https://feeds.pinboard.in/json/u:_af?count=400&cb=linksCb"></script>
      <script src="https://api.github.com/users/af/repos?sort=updated&per_page=15&callback=reposCb"></script>
      `,
        }}
      />
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { allPosts: getAllPosts() },
  };
}

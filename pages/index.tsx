import React, { useEffect, useState } from 'react'

import { getAllPosts } from '../lib/api'
import Layout from '../components/Layout'
import SiteMeta from '../components/SiteMeta'
import OpenSourceCard from '../components/OpenSourceCard'
import PostListItem from '../components/PostListItem'
import SidebarLinks from '../components/SidebarLinks'
import LinksTimeline from '../components/Timeline'
import styles from './Homepage.module.css'
import type { GitHubRepo, BlogPost } from '../components/types'

type Props = {
  allPosts: Array<BlogPost>
}

const NUM_REPOS_TO_SHOW = 6
const filterRepos = (repos: Array<GitHubRepo>) =>
  repos
    .filter(r => !r.fork)
    .filter(r => r.stargazers_count > 2)
    .sort((r1, r2) => (r1.pushed_at < r2.pushed_at ? 1 : -1))
    .slice(0, NUM_REPOS_TO_SHOW)

export default function Homepage({ allPosts }: Props) {
  const [links, setLinks] = useState([])
  const [repos, setRepos] = useState<Array<GitHubRepo | undefined>>(Array(6))
  useEffect(() => {
    // @ts-expect-error global hackery
    window._linksPromise.then(links => setLinks(links))
    // @ts-expect-error more global hackery
    window._reposPromise.then(ghResponse => {
      const repos = filterRepos(ghResponse?.data ?? [])
      setRepos(repos)
    })
  }, [])

  const latestPosts = allPosts.slice(0, 3)
  return (
    <>
      <Layout>
        <SiteMeta>
          <link rel="preconnect" href="https://feeds.pinboard.in" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://api.github.com" crossOrigin="anonymous" />
        </SiteMeta>

        <div className="container">
          <p className={styles.hello}>
            Hi 👋 I’m a software engineer with interests in user interfaces, data visualization, and
            functional programming.
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
            {repos.map((repo, idx) => (
              <OpenSourceCard key={idx} repo={repo?.name ? repo : undefined} />
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

          {latestPosts.map(p => (
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
      <script src="https://feeds.pinboard.in/json/u:_af?count=150&cb=linksCb"></script>
      <script src="https://api.github.com/users/af/repos?sort=updated&per_page=15&callback=reposCb"></script>
      `,
        }}
      />
    </>
  )
}

export async function getStaticProps() {
  return {
    props: { allPosts: getAllPosts() },
  }
}

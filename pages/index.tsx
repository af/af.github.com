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
    .filter((r) => !r.fork)
    .filter((r) => r.stargazers_count > 2)
    .sort((r1, r2) => (r1.pushed_at < r2.pushed_at ? 1 : -1))
    .slice(0, NUM_REPOS_TO_SHOW)

export default function Homepage({ allPosts }: Props) {
  const [links, setLinks] = useState([])
  const [repos, setRepos] = useState<Array<GitHubRepo | undefined>>(Array(6))
  useEffect(() => {
    // Load cached 3rd party data from Cloudflare worker
    fetch('/cache?src=links')
      .then((res) => res.json())
      .then((links) => setLinks(links))

    fetch('/cache?src=repos')
      .then((res) => res.json())
      .then((allRepos) => {
        const repos = filterRepos(allRepos ?? [])
        setRepos(repos)
      })
  }, [])

  const latestPosts = allPosts.slice(0, 3)
  return (
    <>
      <Layout>
        <SiteMeta>
          <link rel="preload" as="fetch" href="/cache?src=links" crossOrigin="anonymous" />
          <link rel="preload" as="fetch" href="/cache?src=repos" crossOrigin="anonymous" />
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
    </>
  )
}

export async function getStaticProps() {
  return {
    props: { allPosts: getAllPosts() },
  }
}

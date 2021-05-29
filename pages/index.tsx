import Head from 'next/head'

import { getAllPosts } from '../lib/api'
import Layout from '../components/Layout'

export default function Index({ allPosts }) {
  // const heroPost = allPosts[0]
  // const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>TODO site title</title>
        </Head>
        <div>
          {allPosts.map(p => <div>{p.title}</div>)}
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}

import Head from "next/head";

import { getAllPosts } from '../lib/api';
import Layout from '../components/Layout';
import styles from './Homepage.module.css'

export default function Index({ allPosts }) {
  return (
    <>
      <Layout>
        <Head>
          <title>TODO min site title</title>
        </Head>
        <div className={styles.hello}>
          why hello there
        </div>
        <div>
          <a href="/posts">view all posts</a>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { allPosts: getAllPosts() },
  };
}

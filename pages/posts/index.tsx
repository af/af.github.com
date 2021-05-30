import Head from "next/head";

import { getAllPosts } from "../../lib/api";
import Layout from "../../components/Layout";

export default function Index({ allPosts }) {
  return (
    <>
      <Layout>
        <Head>
          <title>TODO site title</title>
        </Head>
        <div className="container">
          {allPosts.map((p) => (
            <div key={p.slug}>
              <a href={p.url}>{p.title}</a>
            </div>
          ))}
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

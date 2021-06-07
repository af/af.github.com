import Head from "next/head";

import { getAllPosts } from "../../lib/api";
import Layout from "../../components/Layout";
import SiteMeta from "../../components/SiteMeta"
import PostListItem from "../../components/PostListItem";

type Props = {
  allPosts: Array<any>;
};

export default function Index({ allPosts }: Props) {
  return (
    <>
      <Layout>
        <SiteMeta title="All Posts" />
        <div className="container">
          <h1>All Posts</h1>
          <p>For some unknown reason, I occasionally publish sloppy, mid-length essays on the internet.
          You can find them all here:</p>
          {allPosts.map((p) => (
            <PostListItem post={p} key={p.slug} />
          ))}
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = () => ({
  props: { allPosts: getAllPosts() },
});

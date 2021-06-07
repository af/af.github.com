import React from "react";
import Layout from "../components/Layout";
import SiteMeta from "../components/SiteMeta";

export default function FourOhFour() {
  return (
    <Layout>
      <SiteMeta title="404" />

      <div className="container">
        <h1>Oops, couldn't find that page.</h1>
        That was a 404. It's probably your fault.
      </div>
    </Layout>
  );
}

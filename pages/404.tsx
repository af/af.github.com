import React, { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";

export default function FourOhFour() {
  return (
    <Layout>
      <Head>
        <title>Page not found</title>
      </Head>

      <div className="container">
        <h1>Oops, couldn't find that page.</h1>
        That was a 404. It's probably your fault.
      </div>
    </Layout>
  );
}

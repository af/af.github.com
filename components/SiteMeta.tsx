import React from "react";
import Head from "next/head";

type Props = {
  title?: string;
  description?: string;
  keywords?: string;
  children?: React.ReactNode;
};

// TODO: read from env var?
const DEFAULT_TITLE = "Area man rambles about programming";
const DEFAULT_KEYWORDS = "Aaron Franks, programming, software, Victoria";
const AUTHOR = 'Aaron Franks'

const SiteMeta = ({ title, description, keywords, children }: Props) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{title ?? DEFAULT_TITLE} | {AUTHOR}</title>
      <meta name="keywords" content={keywords ?? DEFAULT_KEYWORDS} />
      <meta name="author" content={AUTHOR} />
      {description && <meta name="description" content={description} />}
      <link rel="shortcut icon" href="/favicon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link type="application/atom+xml" rel="alternate" href="/atom.xml" title={`${AUTHOR} | ${DEFAULT_TITLE}`} />
      {children}
    </Head>
  );
};

export default SiteMeta

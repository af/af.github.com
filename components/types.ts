export type PinboardLink = {
  dt: string; // timestamp
  u: string;  // url
  d: string;  // title
  n: string;  // comment
  t: Array<string>;
};

export type GitHubRepo = {
  fork: boolean;
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
  pushed_at: string;
};

export type BlogPost = {
  content: string,
  date: string,
  keywords?: string,
  slug: string,
  title: string,
  url: string,
};

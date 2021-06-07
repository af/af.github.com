export type PinboardLink = {
  dt: string;
  u: string;
  d: string;
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

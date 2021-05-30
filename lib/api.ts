import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

// TODO: partial type
type PostItem = {
  content: string;
  date: string;
  slug: string;
  url: string;
};

const postsDirectory = join(process.cwd(), "_posts");

// mapping of url cleaned slugs to full file slugs
// FIXME: need to restart server to refresh this
let postLookup: Record<string, PostItem> = {};

const markdownFileRegex = /(\d{4}-\d{2}-\d{2})-(.+)/

const init = () => {
  const rawSlugs = fs.readdirSync(postsDirectory)
  postLookup = rawSlugs.reduce((acc, fsSlug) => {
    const slugWithoutExt = fsSlug.replace(/\.md$/, "");

    const [_full, date, urlSlug] = markdownFileRegex.exec(slugWithoutExt)

    const fullPath = join(postsDirectory, fsSlug);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const postObj = {
      ...data,
      slug: urlSlug,
      url: `/posts/${urlSlug}`,
      content,
      date,
    };
    return { ...acc, [urlSlug]: postObj }
  }, {})
}

init()

export function getPostBySlug(slug: string): PostItem {
  return postLookup[slug]
}

export function getAllPosts() {
  const posts = Object.values(postLookup)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

// TODO: partial type
type PostItem = {
  date: string;
  content: string;
  slug: string;
};

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

// FIXME: clean up and use this
// const markdownFileRegex = /(\d{4}-\d{2}-\d{2})-(.+)/
// const [_full, date, textSlug] = markdownFileRegex.exec(realSlug)

export function getPostBySlug(slug): PostItem {
  // TODO: strip date prefix from slug, eg '2020-12-20-remarkable-2'
  const realSlug = slug.replace(/\.md$/, "");

  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...data,
    slug: realSlug,
    content,
    // FIXME: get from slug
    date: '2020-01-01'
  };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map(getPostBySlug)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  // console.log('POSTS', posts, 'WAT')
  return posts;
}

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

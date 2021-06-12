// see https://gist.github.com/riccardobevilacqua/d3820b80718517448d8ad6c8151fc9ac
// FIXME: clean up and finish this feed implementation to match https://aaronfranks.com/atom.xml
import { markdownToHtml } from './api'

type PostType = any;

const renderPreamble = () => `
  <feed xmlns="http://www.w3.org/2005/Atom">
  <title>Aaron Franks</title>
  <subtitle>Area man rambles about programming</subtitle>
  <link href="https://aaronfranks.com/atom.xml" rel="self"/>
  <link href="https://aaronfranks.com/"/>
  <updated>2021-01-24T08:00:00Z</updated>
  <id>https://aaronfranks.com/</id>
  <author>
  <name>Aaron Franks</name>
  <email/>
  </author>
`

export async function renderFeedItem(post: PostType) {
  const content = await markdownToHtml(post.content || '')

  return `
    <entry>
      <title>${post.title}</title>
      <link href=${post.url}/>
      <updated>${new Date(post.date).toUTCString()}</updated>
      <id>${post.url}</id>
      <content type="html">${content}</content>
    </entry>
  `;
}

export async function renderFeed(posts: PostType) {
  return `
    ${renderPreamble()}
    ${posts.map(renderFeedItem).join('\n')}
  `
}

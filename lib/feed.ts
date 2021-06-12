import { markdownToHtml } from './api'
import type { BlogPost } from '../components/types'

const SITE = 'https://aaronfranks.com/'

const renderPreamble = () => `
  <title>Aaron Franks</title>
  <subtitle>Area man rambles about programming</subtitle>
  <link href="${SITE}/atom.xml" rel="self"/>
  <link href="${SITE}"/>
  <updated>2021-01-24T08:00:00Z</updated>
  <id>${SITE}</id>
  <author>
  <name>Aaron Franks</name>
  <email/>
  </author>
`

export async function renderFeedItem(post: BlogPost) {
  const content = await markdownToHtml(post.content || '')

  return `
    <entry>
      <title>${post.title}</title>
      <link href="${post.url}" />
      <updated>${new Date(post.date).toUTCString()}</updated>
      <id>${post.url}</id>
      <content type="html"><![CDATA[${content}]]></content>
    </entry>
  `
}

export async function renderFeed(posts: Array<BlogPost>) {
  const renderedItems = await Promise.all(posts.map(renderFeedItem))

  return `<?xml version="1.0" encoding="utf-8"?>
    <feed xmlns="http://www.w3.org/2005/Atom" xml:base="${SITE}">
      ${renderPreamble()}
      ${renderedItems.join('\n')}
    </feed>`
}

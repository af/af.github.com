const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const pluginRss = require("@11ty/eleventy-plugin-rss")

// TODO: rss feed
// TODO: replace jekyll seo tag
// TODO: migrate _config.yml
// TODO: figure out bundling & netlify deployment

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPlugin(pluginRss)

  eleventyConfig.addPassthroughCopy('img')

  eleventyConfig.addCollection('posts', collection => {
    const posts = collection.getFilteredByGlob('_posts/*.md')
    posts.reverse()     // Newest posts at the top
    return posts
  })

  eleventyConfig.addCollection('demos', collection => {
    // FIXME: js url on canvasulative page
    return collection.getFilteredByGlob('demos/*.html')
  })
}

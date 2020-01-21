const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const pluginRss = require("@11ty/eleventy-plugin-rss")

// TODO: replace jekyll seo tag
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

  eleventyConfig.addCollection('demos', coll => coll.getFilteredByGlob('demos/*.html'))
  eleventyConfig.addPassthroughCopy("demos/**/*.js");
}

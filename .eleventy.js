const moment = require('moment')
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const pluginRss = require("@11ty/eleventy-plugin-rss")

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

  eleventyConfig.addFilter('date', (date, format) => {
    return moment(date).format(format)
  });

  eleventyConfig.addFilter('log', (thing) => {
    return console.log(thing)
  });

  eleventyConfig.addFilter('readTimeMinutes', (chars) => {
    if (!chars || !chars.length) return ''
    return Math.floor(chars.length / 1200)
  });
}

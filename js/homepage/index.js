import {axisLeft, json, select, scaleTime, timeYear} from 'd3'
import circleChart from './circleChart'


const DAYS_OF_HISTORY = 550     // ~1.5 years of history
const START_DATE = new Date(new Date() - DAYS_OF_HISTORY * 24 * 3600 * 1000)
const GITHUB_URL = 'https://api.github.com/users/af/repos?sort=updated&per_page=20'
const LINKS_URL = 'https://feeds.pinboard.in/json/u:_af?count=400&cb='

// Helper for loading jsonp data.
// The given url should not include the callback function's name (it will be appended)
function jsonp(url, callback) {
    const callbackName = `jsonp_cb_${(new Date).getTime()}`
    const s = document.createElement('script')
    s.src = url + callbackName
    document.body.appendChild(s)
    window[callbackName] = callback
}


const homepage = function() {
    const svg = document.querySelector('.timelineChart')
    const {width, height} = getComputedStyle(svg)
    const [svgWidth, svgHeight] = [parseInt(width), parseInt(height)]
    const margin = {top: 50, right: 20, left: 30}
    const leavePadding = `translate(${margin.left}, ${margin.top})`

    const tScale = scaleTime().range([svgHeight, margin.top])
                           .domain([START_DATE, new Date()])
    // Helper scale function to convert an ISO date string to an x pixel value:
    tScale.fromDateString = function(options = {}) {
        const offset = options.offset || 0
        const propName = options.propName || 'date'

        return d => offset + Math.floor(tScale(new Date(d[propName])))
    }

    // Set up an time axis and put it in the middle
    const timeAxis = axisLeft(tScale).tickSize(1).ticks(timeYear)
    select('.timeAxis')
        .attr('transform', `translate(${svgWidth / 2},0)`)
        .call(timeAxis)

    // Plot the blogposts that are dumped as window._posts in the homepage template
    circleChart({
        data: window._posts,
        scale: tScale,
        rootEl: select('.bubbleRoot').append('g').attr('transform', leavePadding),
        radius: d => (5 + Math.sqrt(d.length) / 5),
        bubbleClass: 'post',
        timeProp: 'date',
        urlProp: 'url',
        titleProp: 'title'
    })

    // Plot saved links from pinboard's JSONP API
    jsonp(LINKS_URL, links => {
        select('.linkChart').classed('loading', false)
        const linksSvg = select('.linkChart')
                            .append('g').attr('transform', leavePadding)

        // Divide links into tag group "buckets":
        const tagGroups = {
            javascript: [],
            programming: [],
            dataviz: [],
            design: [],
            css: [],
            other: []
        }
        const tags = Object.keys(tagGroups)
        links.forEach(l => {
            for (let i = 0; i < tags.length; i++) {
                const t = tags[i]
                if (l.t && l.t.indexOf(t) > -1) return tagGroups[t].push(l)
                else if (i === tags.length - 1) tagGroups[t].push(l)   // Push to 'other' if no other matches
            }
        })

        // Plot a row of circles for each tag group
        const radius = 5
        for (let j = tags.length - 1; j >= 0; j--) {
            const tag = tags[j]
            const yBaseline = 4 * radius * (2 * j + 1)

            // circleChart({
            //     data: tagGroups[tag],
            //     xScale: tScale,
            //     yBaseline,
            //     // links with the "top" tag appear larger in the chart:
            //     radius: d => (d.t.indexOf('top') === -1 ? radius : radius * 1.8),
            //     el: linksSvg,
            //     groupClass: tag,
            //     timeProp: 'dt',
            //     urlProp: 'u',
            //     titleProp: 'd'
            // })

            linksSvg.append('text').attr('class', 'linkLabel')
                .attr('x', tScale(START_DATE) - margin.left)
                .attr('y', yBaseline - radius * 2)
                .text(tag)
        }
    })

    // Plot Github source repos, using their CORS-enabled public API
    json(GITHUB_URL, (err, data) => {
        if (err) return console.error(err)
        const containers = document.querySelectorAll('.ossProjects > li')
        const NUM_REPOS_TO_SHOW = containers.length

        const myRepos = data.filter(r => !r.fork)
                          .filter(r => r.stargazers_count > 2)
                          .sort((r1, r2) => (r1.pushed_at < r2.pushed_at ? 1 : -1))
                          .slice(0, NUM_REPOS_TO_SHOW)

        const fill = (root, selector, text) => root.querySelector(selector).textContent = text
        containers.forEach((el, idx) => {
            const {name, description, stargazers_count, html_url} = myRepos[idx] || {}
            el.querySelector('a').href = html_url  // eslint-disable-line camelcase
            fill(el, '.projectTitle', name)
            fill(el, '.projectDesc', description)
            fill(el, '.projectStars', stargazers_count)
        })
    })
}

export default homepage

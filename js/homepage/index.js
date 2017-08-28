import {axisLeft, json, select, scaleTime, timeYear} from 'd3'
import circleChart from './circleChart'


const DAYS_OF_HISTORY = 600
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

    // Set up an time axis and put it in the middle
    const timeAxis = axisLeft(tScale).tickSize(1).ticks(timeYear)
    select('.timeAxis')
        .attr('transform', `translate(${svgWidth / 2},0)`)
        .call(timeAxis)

    const forceChartData = window._posts.map(p => ({
        radius: (5 + Math.sqrt(p.length) / 5),
        bubbleClass: 'post',
        date: p.date,
        url: p.url,
        title: p.title
    }))

    // Plot saved links from pinboard's JSONP API
    jsonp(LINKS_URL, links => {
        select('.linkChart').classed('loading', false)

        const linkChartData = links.map(l => ({
            radius: 5,
            bubbleClass: 'link',
            date: l.dt,
            url: l.u,
            title: l.d
        }))

        circleChart({
            data: [...forceChartData, ...linkChartData],
            scale: tScale,
            rootEl: select('.bubbleRoot').append('g').attr('transform', leavePadding)
        })

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

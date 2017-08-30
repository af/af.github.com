import {axisLeft, json, select, scaleTime, timeMonth, timeYear} from 'd3'
import circleChart from './circleChart'


const DAYS_OF_HISTORY = 550
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
    const margin = {top: 10, right: 0, left: 0, bottom: 60}
    const leavePadding = `translate(${margin.left}, ${margin.top})`

    const tScale = scaleTime().range([svgHeight - margin.top - margin.bottom, margin.top])
                           .domain([START_DATE, new Date()])

    // Set up a time axis and put it in the middle
    const makeAxis = () => axisLeft(tScale).tickSize(70)
    select('.timeAxis')
        .attr('transform', `translate(${svgWidth / 2},0)`)
        .call(makeAxis().ticks(timeYear))

    // A separate month axis is also rendered for finer-grained ticks
    const nonZeroMonths = timeMonth.filter(d => (d.getUTCMonth() !== 0))
    select('.monthAxis')
        .attr('transform', `translate(${svgWidth / 2},0)`)
        .call(makeAxis().ticks(nonZeroMonths))

    const postChartData = window._posts.map(p => ({
        radius: (5 + Math.sqrt(p.length) / 5),
        bubbleClass: 'post',
        initialX: svgWidth * 0.7,
        date: p.date,
        url: p.url,
        title: p.title
    }))

    // Plot saved links from pinboard's JSONP API
    jsonp(LINKS_URL, links => {
        // Divide links into tag group "buckets":
        const tags = ['javascript', 'programming', 'design']
        const getGroupName = link => tags.find(t => link.t && link.t.includes(t)) || 'other'

        const linkChartData = links.map(l => {
            const group = getGroupName(l)
            const isTopLink = l.t.includes('top')
            return {
                radius: 5 * (isTopLink ? 1.8 : 1),
                bubbleClass: `link ${group} ${top}`,
                initialX: svgWidth / 2,
                date: l.dt,
                url: l.u,
                title: l.d
            }
        })

        circleChart({
            data: [...postChartData, ...linkChartData],
            scale: tScale,
            rootEl: select('.bubbleRoot').append('g').attr('transform', leavePadding)
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

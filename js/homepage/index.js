import {axisLeft, axisTop, json, select, scaleOrdinal, scaleTime, timeMonth, timeYear} from 'd3'
import circleChart from './circleChart'


const DAYS_OF_HISTORY = 580
const START_DATE = new Date(new Date() - DAYS_OF_HISTORY * 24 * 3600 * 1000)
const GITHUB_URL = 'https://api.github.com/users/af/repos?sort=updated&per_page=20'
const CATEGORY_LANES = {javascript: -0.3, programming: -0.1, design: 0.3, other: 0.1}
const TAGS = Object.keys(CATEGORY_LANES)


const renderRepos = repos => {
    const containers = document.querySelectorAll('.ossProjects > li')
    const NUM_REPOS_TO_SHOW = containers.length

    const myRepos = repos.filter(r => !r.fork)
                      .filter(r => r.stargazers_count > 2)
                      .sort((r1, r2) => (r1.pushed_at < r2.pushed_at ? 1 : -1))
                      .slice(0, NUM_REPOS_TO_SHOW)

    const fill = (root, selector, text) => root.querySelector(selector).textContent = text
    containers.forEach((el, idx) => {
        const {name, description, stargazers_count, html_url} = myRepos[idx] || {}
        const link = el.querySelector('a')
        link.href = html_url  // eslint-disable-line camelcase
        link.classList.remove('loading')
        fill(el, '.projectTitle', name)
        fill(el, '.projectDesc', description)
        fill(el, '.projectStars', stargazers_count)
    })
}

const tagsToHtml = tags => `
    <ul class="tags">
    ${tags.map(t => `
        <li>
            <a class="tag-${t}" href="https://pinboard.in/u:_af/t:${t}">${t}</a>
        </li>
    `).join('')}
    </ul>
`

const renderLinkSidebar = links => {
    const container = document.querySelector('.latestLinks')
    const htmlItems = links.slice(0, 10).map(l => `
        <article>
            <h1><a href="${l.u}">${l.d}</a></h1>
            <blockquote>${l.n}</blockquote>
            ${tagsToHtml(l.t)}
            <time>${l.dt.split('T')[0]}</time>
        </article>
    `)
    container.innerHTML = htmlItems.join('')
}

const renderTimeline = svg => {
    const {width, height, display} = getComputedStyle(svg)
    if (display === 'none') return  // Don't do expensive rendering on mobile (svg is hidden)

    const [svgWidth, svgHeight] = [parseInt(width), parseInt(height)]
    const margin = {top: 30, right: 0, left: 0, bottom: 10}
    const leavePadding = `translate(${svgWidth / 2}, ${margin.top})`

    const tScale = scaleTime().range([svgHeight - margin.top - margin.bottom, margin.top])
                           .domain([START_DATE, new Date()])

    // Set up an axis above the chart with category labels
    const ordScale = scaleOrdinal()
                        .domain(Object.keys(CATEGORY_LANES))
                        .range(Object.values(CATEGORY_LANES).map(v => v * svgWidth))
    const catAxis = select('.categoryAxis')
    catAxis
        .attr('transform', leavePadding)
        .call(axisTop(ordScale))
    catAxis.selectAll('text')
        .attr('transform', 'rotate(-20) translate(40)')
        .data(Object.keys(CATEGORY_LANES))
        .attr('class', d => d)

    // Set up a time axis and put it in the middle
    const makeAxis = () => axisLeft(tScale).tickSize(120)
    select('.yearAxis')
        .attr('transform', leavePadding)
        .call(makeAxis().ticks(timeYear))

    // A separate month axis is also rendered for finer-grained ticks
    const nonZeroMonths = timeMonth.filter(d => (d.getUTCMonth() !== 0))
    select('.monthAxis')
        .attr('transform', leavePadding)
        .call(makeAxis().ticks(nonZeroMonths))

    // Plot saved links from pinboard's JSONP API
    window._linksPromise.then(links => {
        // Divide links into tag group "buckets":
        const getGroupForLink = link => TAGS.find(t => link.t && link.t.includes(t)) || 'other'

        const linkChartData = links.map(l => {
            const group = getGroupForLink(l)
            const isTopLink = l.t.includes('top')
            return {
                radius: 6 * (isTopLink ? 1.5 : 1),
                bubbleClass: `link ${group} ${isTopLink ? 'top' : ''}`,
                initialX: svgWidth * CATEGORY_LANES[group],
                date: l.dt,
                url: l.u,
                title: l.d
            }
        })

        circleChart({
            data: linkChartData,
            scale: tScale,
            rootEl: select('.bubbleRoot').append('g').attr('transform', leavePadding)
        })
    })
}


const homepageMain = () => {
    // Render latest links from pinboard
    window._linksPromise.then(renderLinkSidebar)

    // Render Github source repos, using their CORS-enabled public API
    json(GITHUB_URL, (err, repos) => {
        err
            ? console.error(err)
            : renderRepos(repos)
    })

    renderTimeline(document.querySelector('.timelineChart'))
}

export default homepageMain

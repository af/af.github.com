import {axisTop, json, select, scaleTime, timeYear} from 'd3'
import circleChart from './circleChart'
import codeChart from './codeChart'

const WIN_WIDTH = window.innerWidth
const DAYS_OF_HISTORY = WIN_WIDTH > 600 ? 548 : 190         // 1.5 or 0.5 years of history
const START_DATE = new Date(new Date() - DAYS_OF_HISTORY*24*3600*1000)
const GITHUB_URL = 'https://api.github.com/users/af/repos?per_page=60'
const LINKS_URL = 'https://feeds.pinboard.in/json/u:_af?count=400&cb='

// Helper for loading jsonp data.
// The given url should not include the callback function's name (it will be appended)
function jsonp(url, callback) {
    const callbackName = 'jsonp_cb' + (new Date).getTime()
    const s = document.createElement('script')
    s.src = url + callbackName
    document.body.appendChild(s)
    window[callbackName] = callback
}


const homepage = function() {
    const svgWidth = parseInt(getComputedStyle(document.querySelector('svg')).width)
    const margin = {top: 40, right: 20, left: 30}
    const leavePadding = `translate(${margin.left}, ${margin.top})`

    const x = scaleTime().range([0, svgWidth - margin.left - margin.right])
                           .domain([START_DATE, new Date()])
    // Helper scale function to convert an ISO date string to an x pixel value:
    x.fromDateString = function(options={}) {
        const offset = options.offset || 0
        const propName = options.propName || 'date'

        return d => offset + Math.floor(x(new Date(d[propName])))
    }

    // Set up an x axis and put it on the top chart:
    const xAxis = axisTop(x)
                    .tickSizeInner(6)
                    .tickSizeOuter(0)
                    .ticks(timeYear)
    select('section:first-of-type svg').append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('class', 'xAxis')
        .call(xAxis)

    // Plot the blogposts that are dumped as window._posts in the homepage template
    circleChart({
        data: window._posts,
        width: svgWidth,
        xScale: x,
        yBaseline: 30,
        el: select('section.posts svg')
                .append('g').attr('transform', leavePadding),
        radius: d => (15 + Math.sqrt(d.length)/5),
        groupClass: 'post',
        timeProp: 'date',
        urlProp: 'url',
        titleProp: 'title'
    })

    // Plot saved links from pinboard's JSONP API
    jsonp(LINKS_URL, function(links) {
        select('section.links').classed('loading', false)
        const linksSvg = select('section.links svg')
                            .append('g').attr('transform', leavePadding)

        // Divide links into tag group "buckets":
        const tagGroups = {
            javascript: [], programming: [],
            dataviz: [], design: [], css: [], other: []
        };
        const tags = Object.keys(tagGroups)
        links.forEach(function(l) {
            for (let i=0; i<tags.length; i++) {
                const t = tags[i]
                if (l.t && l.t.indexOf(t) > -1) return tagGroups[t].push(l)
                else if (i === tags.length - 1) tagGroups[t].push(l)   // Push to 'other' if no other matches
            }
        })

        // Plot a row of circles for each tag group
        const radius = 5
        for (let j=tags.length-1; j >= 0; j--) {
            const tag = tags[j]
            const yBaseline = 4 * radius * (2*j + 1)

            circleChart({
                data: tagGroups[tag],
                width: svgWidth,
                xScale: x,
                yBaseline,
                // links with the "top" tag appear larger in the chart:
                radius: d => (d.t.indexOf('top') === -1 ? radius : radius * 1.8),
                el: linksSvg,
                groupClass: tag,
                timeProp: 'dt',
                urlProp: 'u',
                titleProp: 'd'
            })

            linksSvg.append('text').attr('class', 'linkLabel')
                .attr('x', x(START_DATE) - margin.left)
                .attr('y', yBaseline - radius * 2)
                .text(tag)
        }
    })

    // Plot Github source repos, using their CORS-enabled public API
    json(GITHUB_URL, function(err, data) {
        const $section = select('section.code')
        if (err) return $section.classed('failed', true)

        $section.classed('loading', false)
        const myRepos = data.filter(r => !r.fork)
                          .filter(r => (new Date(r.pushed_at)) > START_DATE)
                          .sort((r1, r2) => (r1.pushed_at < r2.pushed_at) ? 1 : -1)
        codeChart({
            data: myRepos,
            width: svgWidth,
            xScale: x,
            el: select('section.code svg')
                    .append('g').attr('transform', leavePadding)
        })
    })
}

export default homepage

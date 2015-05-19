var d3 = require('d3')
var circleChart = require('./circleChart')
var codeChart = require('./codeChart')

const WIN_WIDTH = window.innerWidth
const DAYS_OF_HISTORY = WIN_WIDTH > 600 ? 548 : 190         // 1.5 or 0.5 years of history
const START_DATE = new Date(new Date() - DAYS_OF_HISTORY*24*3600*1000)
const GITHUB_URL = 'https://api.github.com/users/af/repos?per_page=60'
const LINKS_URL = 'https://feeds.pinboard.in/json/u:_af?count=300&cb='

// Helper for loading jsonp data.
// The given url should not include the callback function's name (it will be appended)
function jsonp(url, callback) {
    var callbackName = 'jsonp_cb' + (new Date).getTime()
    var s = document.createElement('script')
    s.src = url + callbackName
    document.body.appendChild(s)
    window[callbackName] = callback
}


module.exports = function() {
    var svgWidth = parseInt(getComputedStyle(document.querySelector('svg')).width)
    var margin = {top: 40, right: 150, left: 20}
    var leavePadding = 'translate(' + margin.left + ',' + margin.top + ')'

    var x = d3.time.scale().range([0, svgWidth - margin.left - margin.right])
                           .domain([START_DATE, new Date()])
    // Helper scale function to convert an ISO date string to an x pixel value:
    x.fromDateString = function(options={}) {
        var offset = options.offset || 0
        var propName = options.propName || 'date'

        return d => offset + Math.floor(x(new Date(d[propName])))
    }

    // Set up an x axis and put it on the top chart:
    var xAxis = d3.svg.axis().scale(x).orient('top')
                    .innerTickSize(6)
                    .outerTickSize(0)
                    .ticks(d3.time.years, 1)
    d3.select('section:first-of-type svg').append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
        .attr('class', 'xAxis')
        .call(xAxis)

    // Plot the blogposts that are dumped as window._posts in the homepage template
    circleChart({
        data: window._posts,
        width: svgWidth,
        xScale: x,
        yBaseline: 30,
        el: d3.select('section.posts svg')
                .append('g').attr('transform', leavePadding),
        radius: d => (15 + Math.sqrt(d.length)/5),
        loadingDelay: 1500,
        groupClass: 'post',
        timeProp: 'date',
        urlProp: 'url',
        titleProp: 'title'
    })

    // Plot saved links from delicious's JSONP API
    jsonp(LINKS_URL, function(links) {
        d3.select('section.links').classed('loading', false)
        var linksSvg = d3.select('section.links svg')
                            .append('g').attr('transform', leavePadding)

        // Divide links into tag group "buckets":
        var tagGroups = {
            top20: [], javascript: [], programming: [],
            dataviz: [], design: [], css: [],
            vim: [], music: [], other: []
        };
        var tags = Object.keys(tagGroups)
        links.forEach(function(l) {
            for (var i=0; i<tags.length; i++) {
                var t = tags[i]
                if (l.t && l.t.indexOf(t) > -1) return tagGroups[t].push(l)
                else if (i === tags.length - 1) tagGroups[t].push(l)   // Push to 'other' if no other matches
            }
        })

        // Plot a row of circles for each tag group
        const radius = 10
        for (var j=tags.length-1; j >= 0; j--) {
            var tag = tags[j]
            var yBaseline = radius * (2*j + 1)

            circleChart({
                data: tagGroups[tag],
                width: svgWidth,
                xScale: x,
                yBaseline: yBaseline,
                radius: 10,
                el: linksSvg,
                groupClass: tag,
                timeProp: 'dt',
                urlProp: 'u',
                titleProp: 'd',
                loadingDelay: 2000
            })

            linksSvg.append('text').attr('class', 'linkLabel')
                .attr('x', x(new Date()) + radius)
                .attr('y', yBaseline + radius/2)
                .text(tag)
        }
    })

    // Plot Github source repos, using their CORS-enabled public API
    d3.json(GITHUB_URL, function(err, data) {
        var $section = d3.select('section.code')
        if (err) return $section.classed('failed', true)

        $section.classed('loading', false)
        var myRepos = data.filter(r => !r.fork)
                          .filter(r => (new Date(r.pushed_at)) > START_DATE)
                          .sort((r1, r2) => (r1.pushed_at < r2.pushed_at) ? 1 : -1)
        codeChart({
            data: myRepos,
            width: svgWidth,
            xScale: x,
            el: d3.select('section.code svg')
                    .append('g').attr('transform', leavePadding),
        })
    })
}

var d3 = require('d3');
var circleChart = require('./circleChart');
var codeChart = require('./codeChart');

var START_DATE = new Date(new Date() - 548*24*3600*1000);   // ~ 1.5 years of history
var GITHUB_URL = 'https://api.github.com/users/af/repos?per_page=60';
var DELICIOUS_URL = 'https://api.del.icio.us/v2/json/aaron.franks?count=100&callback=linksCallback';


module.exports = function() {
    var svgWidth = parseInt(getComputedStyle(document.querySelector('svg')).width);

    var margin = {top: 20, right: 150, left: 20};
    var x = d3.time.scale().range([0, svgWidth - margin.left - margin.right])
                           .domain([START_DATE, new Date()]);
    var leavePadding = 'translate(' + margin.left + ',' + margin.top + ')';

    // Set up an x axis and put it on the code chart:
    var xAxis = d3.svg.axis().scale(x)
                    .tickSize(1)
                    .ticks(d3.time.years, 1);
    d3.select('section.code svg').append('g')
        .attr('transform', 'translate(' + margin.left + ',0)')
        .call(xAxis);

    // Helper function to convert an ISO date string to an x pixel value
    var dateToX = function(options) {
        options = options || {};
        var offset = options.offset || 0;
        var propName = options.propName || 'date';

        return function(d) {
            var xVal = Math.floor(x(new Date(d[propName])));
            return Math.max(0, xVal + offset);
        };
    };

    // Plot the blogposts that are dumped as window._posts in the homepage template
    circleChart({
        data: window._posts,
        width: svgWidth,
        dateToX: dateToX,
        yBaseline: 30,
        el: d3.select('section.posts svg')
                .append('g').attr('transform', leavePadding),
        radius: function(d) { return 15 + Math.sqrt(d.length)/5; },
        groupClass: 'post',
        timeProp: 'date',
        urlProp: 'url',
        titleProp: 'title'
    });

    // Plot saved links from delicious's JSONP API
    var s = document.createElement('script');
    s.src = DELICIOUS_URL;
    document.body.appendChild(s);
    window.linksCallback = function(links) {
        // Divide links into tag group "buckets":
        var tagGroups = {javascript: [], programming: [], design: [], other: []};
        var tags = Object.keys(tagGroups);
        links.forEach(function(l) {
            for (var i=0; i < tags.length; i++) {
                var t = tags[i];
                if (l.t && l.t.indexOf(t) > -1) return tagGroups[t].push(l);
                else if (i === tags.length - 1) tagGroups[t].push(l);   // Push to 'other' if no other matches
            }
        });

        // Plot a row of circles for each tag group
        for (var j=tags.length-1; j >= 0; j--) {
            var tag = tags[j];
            circleChart({
                data: tagGroups[tag],
                width: svgWidth,
                dateToX: dateToX,
                yBaseline: 20 + j*20,
                radius: 10,
                el: d3.select('section.links svg')
                        .append('g').attr('transform', leavePadding),
                groupClass: tag,
                timeProp: 'dt',
                urlProp: 'u',
                titleProp: 'd'
            });
        }
    };

    // Plot Github source repos, using their CORS-enabled public API
    d3.json(GITHUB_URL, function(err, data) {
        if (err) return alert('gh fail');
        var myRepos = data.filter(function(r) { return !r.fork })
                          .filter(function(r) { return (new Date(r.pushed_at)) > START_DATE })
                          .sort(function(r1, r2) {
                            return (r1.pushed_at < r2.pushed_at) ? 1 : -1;
                          });
        codeChart({
            data: myRepos,
            width: svgWidth,
            xScale: x,
            dateToX: dateToX,
            el: d3.select('section.code svg')
                    .append('g').attr('transform', leavePadding),
        });
    });
};

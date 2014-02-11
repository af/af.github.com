var d3 = require('d3');

var START_DATE = (new Date('2013-01-01'));
var GITHUB_URL = 'https://api.github.com/users/af/repos?per_page=60';
var DELICIOUS_URL = 'https://api.del.icio.us/v2/json/aaron.franks?count=100&callback=linksCallback';

function timestamp(dateString) {
    return (new Date(dateString)).getTime();
}

// TODOs
// better shape for repo entries
// scale graph to browser width
// time axes
var githubGraph = function(config) {
    var COMET_SPACING = 25;
    var x = config.xScale;
    var createdAtX = config.dateToX({ propName: 'created_at' });

    var myRepos = config.data.filter(function(r) { return !r.fork })
                             .filter(function(r) { return (new Date(r.pushed_at)) > START_DATE })
                             .sort(function(r1, r2) { return timestamp(r1.created_at) - timestamp(r2.created_at); });

    var all = config.el.selectAll('g.repo').data(myRepos);
    var enter = all.enter().append('g').attr('class', 'repo');


    var links = enter.append('a')
            .attr('xlink:href', function(d) { return d.html_url });

    // Add rects to expand the hoverable area:
    links.append('rect')
            .attr('width', function(d, i) { return x(new Date(d.pushed_at)) - createdAtX(d) })
            .attr('height', COMET_SPACING)
            .attr('transform', function(d, i) {
                return "translate(" + createdAtX(d) + "," + (i*COMET_SPACING) + ")";
            });

    links.append('text').attr('class', 'name')
            .attr('transform', function(d, i) {
                return "translate(" + createdAtX(d) + "," + (25 + i*COMET_SPACING) + ")";
            })
            .text(function(d) { return d.name })
            .append('tspan')
                .attr('class', 'language')
                .attr('dx', 10)
                .text(function(d) { return d.language });

    // Draw "comet" shape for each repo:
    links.append('path')
            .attr('d', function(d) {
                var width = x(new Date(d.pushed_at)) - createdAtX(d);
                var height = 10 + Math.floor(Math.sqrt(d.stargazers_count));
                var path = 'M0 2 ';
                path += ('Q' + width + ' 0 ' + (width - 10) + ' ' + height + ' ');
                path += ('L' + width + ' 0 ');
                path += ('L' + (width - 10) + ' ' + (-height) + ' ');
                path += ('Q' + width + ' 0 0 -2');
                return path;
            })
            .attr('transform', function(d, i) {
                return "translate(" + createdAtX(d) + "," + (30 + i*COMET_SPACING) + ")";
            });

    // Add description text last, so it's above the comet path:
    links.append('text').attr('class', 'description')
            .attr('transform', function(d, i) {
                return "translate(" + createdAtX(d) + "," + (45 + i*COMET_SPACING) + ")";
            })
            .text(function(d) { return d.description });

};


// Simple plot of blogposts over time
function postsGraph(config) {
    var dateToX = config.dateToX;

    var all = config.el.selectAll('g').data(config.data);
    var enter = all.enter().append('g').attr('class', 'post');

    var links = enter.append('a')
            .attr('xlink:href', function(d) { return d.url });

    links.append('circle')
            .attr('cx', dateToX())
            .attr('cy', 20)
            .attr('r', 20);

    links.append('line')
            .attr('x1', dateToX({ offset: 0.5 }))
            .attr('x2', dateToX({ offset: 0.5 }))
            .attr('y1', 43)
            .attr('y2', 85);

    enter.append('text')
            .text(function(d) { return d.title })
            .attr('transform', function(d) {
                return 'translate(' + dateToX({ offset: 5 })(d) + ',70)';
            });
    enter.append('text').attr('class', 'date')
            .text(function(d) { return (new Date(d.date)).toISOString().split('T')[0]; })
            .attr('transform', function(d) {
                return 'translate(' + dateToX({ offset: 5 })(d) + ',87)';
            });
}

// Simple plot of links over time
function linksGraph(config) {
    var dateToX = config.dateToX;

    var all = config.el.selectAll('g').data(config.data);
    var enter = all.enter().append('g').attr('class', 'link');

    var links = enter.append('a')
            .attr('xlink:href', function(d) { return d.u });

    links.append('circle')
            .attr('cx', dateToX({ propName: 'dt' }))
            .attr('cy', 20)
            .attr('r', 20);

    links.append('line')
            .attr('x1', dateToX({ propName: 'dt', offset: 0.5 }))
            .attr('x2', dateToX({ propName: 'dt', offset: 0.5 }))
            .attr('y1', 43)
            .attr('y2', 85);

    enter.append('text')
            .text(function(d) { return d.d })
            .attr('transform', function(d) {
                return 'translate(' + dateToX({ propName: 'dt', offset: 5 })(d) + ',70)';
            });
    enter.append('text').attr('class', 'date')
            .text(function(d) { return (new Date(d.dt)).toISOString().split('T')[0]; })
            .attr('transform', function(d) {
                return 'translate(' + dateToX({ propName: 'dt', offset: 5 })(d) + ',87)';
            });
}


module.exports = function() {
    var svgWidth = parseInt(getComputedStyle(document.querySelector('svg')).width);
    var x = d3.time.scale().range([0, svgWidth])
                           .domain([START_DATE, new Date()]);
    var dateToX = function(options) {
        options = options || {};
        var offset = options.offset || 0;
        var propName = options.propName || 'date';

        return function(d) {
            var xVal = Math.floor(x(new Date(d[propName])));
            return Math.max(0, xVal + offset);
        };
    };

    postsGraph({
        data: window._posts,
        width: svgWidth,
        dateToX: dateToX,
        el: d3.select('section.posts svg')
    });

    d3.json(GITHUB_URL, function(err, data) {
        if (err) return alert('gh fail');
        githubGraph({
            data: data,
            width: svgWidth,
            xScale: x,
            dateToX: dateToX,
            el: d3.select('section.code svg')
        });
    });

    // Load data via JSONP from the delicious API
    var s = document.createElement('script');
    s.src = DELICIOUS_URL;
    document.body.appendChild(s);
    window.linksCallback = function(links) {
        linksGraph({
            data: links,
            width: svgWidth,
            xScale: x,
            dateToX: dateToX,
            el: d3.select('section.links svg')
        });
    };
};

var d3 = require('d3');

var START_DATE = (new Date('2013-01-01'));
var GITHUB_URL = 'https://api.github.com/users/af/repos?per_page=60';

// FIXME: need CORS-enabeled proxy for Delicious
//var DELICIOUS_URL = 'http://feeds.delicious.com/v2/json/aaron.franks?count=100';

function timestamp(dateString) {
    return (new Date(dateString)).getTime();
}

// TODOs
// better shape for repo entries
// scale graph to browser width
// time axes
var githubGraph = function(config) {
    var svg = config.el;
    var COMET_SPACING = 25;
    var x = d3.time.scale().range([0, config.width])
                           .domain([START_DATE, new Date()]);

    var createdAtX = function(d) {
        var xVal = Math.floor(x(new Date(d.created_at)));
        return Math.max(0, xVal);
    };

    var myRepos = config.data.filter(function(r) { return !r.fork })
                             .filter(function(r) { return (new Date(r.pushed_at)) > START_DATE })
                             .sort(function(r1, r2) { return timestamp(r1.created_at) - timestamp(r2.created_at); });

    var all = svg.selectAll('g.repo').data(myRepos);
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

module.exports = function() {
    var svgWidth = parseInt(getComputedStyle(document.querySelector('svg')).width);

    d3.json(GITHUB_URL, function(err, data) {
        if (err) return alert('gh fail');
        githubGraph({
            data: data,
            width: svgWidth,
            el: d3.select('section.code svg')
        });
    });
};

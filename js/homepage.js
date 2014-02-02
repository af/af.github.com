var d3 = require('d3');

var START_DATE = (new Date('2013-01-01')).getTime();
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
    var myRepos = config.data.filter(function(r) { return !r.fork })
                             .sort(function(r1, r2) { return timestamp(r1.created_at) - timestamp(r2.created_at); });
    config.el.selectAll('circle').data(myRepos)
             .enter().append('circle')
             .attr('cx', function(d) {
                 return (timestamp(d.pushed_at) - START_DATE)/(3600*1000*24);
             })
             .attr('cy', function(d, i) { return 30 + i*10 })
             .attr('r', function(d) { return 10 + Math.sqrt(d.stargazers_count); })
             .attr('title', function(d) { return d.name }) // FIXME: for debugging only
             .attr('fill', 'rgba(20, 20, 190, 0.5)');      // TODO: color by language type
};

module.exports = function() {
    d3.json(GITHUB_URL, function(err, data) {
        if (err) return alert('gh fail');
        githubGraph({
            data: data,
            el: d3.select('.code_graph')
        });
    });
};

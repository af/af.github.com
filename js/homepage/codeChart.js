var COMET_SPACING = 25;

// Convert Github repository API data into a "comet" date chart
module.exports = function(config) {
    var x = config.xScale;
    var createdAtX = x.fromDateString({ propName: 'created_at' });

    var all = config.el.selectAll('g.repo').data(config.data);
    var enter = all.enter().append('g')
                    .attr('class', 'repo')
                    .attr('transform', 'translate(0,20)');  // clears space for x-axis at top

    var links = enter.append('a')
            .attr('xlink:href', function(d) { return d.html_url });

    // Add rects to expand the hoverable area:
    links.append('rect')
            .attr('width', function(d, i) { return x(new Date(d.pushed_at)) - createdAtX(d) })
            .attr('height', COMET_SPACING)
            .attr('transform', function(d, i) {
                return "translate(" + createdAtX(d) + "," + (15 + i*COMET_SPACING) + ")";
            });

    var text = links.append('text').attr('class', 'name')
            .attr('transform', function(d, i) {
                return "translate(" + createdAtX(d) + "," + (25 + i*COMET_SPACING) + ")";
            })
            .text(function(d) { return d.name });
    text.append('tspan')
        .attr('class', 'language')
        .attr('dx', 10)
        .text(function(d) { return d.language });
    text.append('tspan')
        .attr('class', 'description')
        .attr('dx', 10)
        .text(function(d) { return d.description });

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
};


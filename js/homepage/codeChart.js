var COMET_SPACING = 25;

// Convert Github repository API data into a "comet" date chart
module.exports = function(config) {
    var x = config.xScale;
    var createdAtX = x.fromDateString({ propName: 'created_at' });

    var drawComet = function(d) {
        var path = 'M0 2 ';
        var height = 4 + Math.floor(Math.sqrt(d.size)/2);
        var width = x(new Date(d.pushed_at)) - createdAtX(d);
        width = Math.max(20, width);

        path += ('Q' + width + ' 0 ' + (width - 10) + ' ' + height + ' ');
        path += ('L' + width + ' 0 ');
        path += ('L' + (width - 10) + ' ' + (-height) + ' ');
        path += ('Q' + width + ' 0 0 -2');
        return path;
    };

    var dataLength = (config.data || []).length;
    var all = config.el.selectAll('g.repo').data(config.data);
    var enter = all.enter().append('g')
                    .attr('class', 'repo')
                    .attr('transform-origin', createdAtX + ' 0')
                    .attr('transform', 'scale(0,1)');
    enter.transition()
            .delay(function(d, i) { return (dataLength - i)*100 })
            .duration(1000).attr('transform', 'scale(1,1)');

    var links = enter.append('a')
            .attr('xlink:href', function(d) { return d.html_url });

    // Add rects to expand the hoverable area:
    links.append('rect')
            .attr('width', function(d, i) { return x(new Date(d.pushed_at)) - createdAtX(d) })
            .attr('height', COMET_SPACING)
            .attr('transform', function(d, i) {
                return "translate(" + createdAtX(d) + "," + (15 + i*COMET_SPACING) + ")";
            });

    // Draw "comet" shape for each repo:
    links.append('path')
            .attr('d', drawComet)
            .attr('transform', function(d, i) {
                return "translate(" + createdAtX(d) + "," + (30 + i*COMET_SPACING) + ")";
            });

    // Repo text is in one <text> element with several <tspan>s
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
};


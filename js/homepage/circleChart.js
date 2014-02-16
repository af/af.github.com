var d3 = require('d3');

// Simple chart mapping content as circles along a time axis.
// Config params:
//  data
//  el
//  dateToX
//  groupClass
//  timeProp
//  urlProp
//  titleProp
//  radius
//  yBaseline
module.exports = function circleChart(config) {
    var dateToX = config.dateToX;
    var yBaseline = config.yBaseline || 20;
    var radius = config.radius || 20;
    if (typeof radius !== 'function') {
        var r = radius;
        radius = function() { return r };
    }

    var selector = 'g' + (config.groupClass ? '.' + config.groupClass : '');
    var all = config.el.selectAll(selector).data(config.data);
    var enter = all.enter().append('g').attr('class', config.groupClass || '');

    var links = enter.append('a')
            .attr('xlink:href', function(d) { return d[config.urlProp] });

    links.append('circle')
            .attr('cx', dateToX({ propName: config.timeProp }))
            .attr('cy', yBaseline)
            .attr('r', radius);

    links.append('line')
            .attr('x1', dateToX({ propName: config.timeProp, offset: 0.5 }))
            .attr('x2', dateToX({ propName: config.timeProp, offset: 0.5 }))
            .attr('y1', function(d) {
                var radius = parseFloat(d3.select(this.parentElement.firstChild).attr('r'));
                return yBaseline + radius + 3;
            })
            .attr('y2', function(d) { return parseFloat(d3.select(this).attr('y1')) + 30; });

    enter.append('text')
            .text(function(d) { return d[config.titleProp] })
            .attr('transform', function(d) {
                var x = dateToX({ propName: config.timeProp, offset: 5 })(d);
                var y = yBaseline + radius(d) + 20;
                return 'translate(' + [x,y].join(',') + ')';
            });
    enter.append('text').attr('class', 'date')
            .text(function(d) { return (new Date(d[config.timeProp])).toISOString().split('T')[0]; })
            .attr('transform', function(d) {
                var x = dateToX({ propName: config.timeProp, offset: 5 })(d);
                var y = yBaseline + radius(d) + 35;
                return 'translate(' + [x,y].join(',') + ')';
            });
};

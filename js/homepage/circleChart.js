var d3 = require('d3');

// Simple chart mapping content as circles along a time axis.
// Config params:
//  data
//  el
//  xScale
//  groupClass
//  timeProp
//  urlProp
//  titleProp
//  radius
//  yBaseline
//  loadingDelay
module.exports = function circleChart(config) {
    var x = config.xScale;
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
            .attr('xlink:href', d => d[config.urlProp]);

    var circles = links.append('circle')
            .attr('cx', x.fromDateString({ propName: config.timeProp }))
            .attr('cy', yBaseline)
            .attr('r', 0);

    var loadingDelay = config.loadingDelay || 0;
    circles.transition()
            .delay(() => loadingDelay + Math.random()*1000)
            .duration(1000).attr('r', radius);

    links.append('line')
            .attr('x1', x.fromDateString({ propName: config.timeProp, offset: 0.5 }))
            .attr('x2', x.fromDateString({ propName: config.timeProp, offset: 0.5 }))
            .attr('y1', function(d) {
                var radius = parseFloat(d3.select(this.parentElement.firstChild).attr('r'));
                return yBaseline + radius + 3;
            })
            .attr('y2', function() { parseFloat(d3.select(this).attr('y1')) + 40 });

    enter.append('text')
            .text(d => d[config.titleProp])
            .attr('transform', function(d) {
                var xVal = x.fromDateString({ propName: config.timeProp, offset: 5 })(d);
                var y = yBaseline + radius(d) + 20;
                return 'translate(' + [xVal,y].join(',') + ')';
            });
    enter.append('text').attr('class', 'date')
            .text(d => (new Date(d[config.timeProp])).toISOString().split('T')[0])
            .attr('transform', function(d) {
                var xVal = x.fromDateString({ propName: config.timeProp, offset: 5 })(d);
                var y = yBaseline + radius(d) + 35;
                return 'translate(' + [xVal,y].join(',') + ')';
            });
};

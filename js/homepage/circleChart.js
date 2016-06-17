const d3 = require('d3')
const forceChart = require('../forceChart')

// Simple chart mapping content as circles along a time axis.
// Config params:
//  data
//  el
//  xScale
//  groupClass
//  timeProp
//  urlProp
//  titleProp
//  radius (function)
//  yBaseline
module.exports = function circleChart(config) {
    var x = config.xScale
    var yBaseline = config.yBaseline || 20
    var radius = config.radius || 5

    var selector = 'g' + (config.groupClass ? '.' + config.groupClass : '')
    var all = config.el.selectAll(selector).data(config.data)

    var bubbleChart = forceChart()
        .size([config.width, 300])  // FIXME
        .x(x.fromDateString({ propName: config.timeProp }))
        .padding(1)
        .y(yBaseline)
        .r(radius)
        .xGravity(3)    // make the x-position more accurate
        .yGravity(1)    // ...and the y-position more flexible

    var groups = config.el.append('g').call(bubbleChart, config.data)
        .attr('class', 'bubbles')
        .selectAll('.node')

    var links = groups.append('a')
            .attr('xlink:href', d => d[config.urlProp])

    links.append('circle')
        .attr('r', d => d.r0)
        .attr('fill', 'slategrey')

    links.append('line')
            .attr('x1', 1)
            .attr('x2', 1)
            .attr('y1', function(d) {
                var radius = parseFloat(d3.select(this.parentElement.firstChild).attr('r'))
                return radius + 3
            })
            .attr('y2', function() { return parseFloat(d3.select(this).attr('y1')) + 40 })

    links.append('text')
            .text(d => d[config.titleProp])
            .attr('transform', function(d) {
                var xVal = 5
                var y = radius(d) + 20
                return 'translate(' + [xVal,y].join(',') + ')'
            })
    links.append('text').attr('class', 'date')
            .text(d => (new Date(d[config.timeProp])).toISOString().split('T')[0])
            .attr('transform', function(d) {
                var xVal = 5
                var y = radius(d) + 35
                return 'translate(' + [xVal,y].join(',') + ')'
            })
}

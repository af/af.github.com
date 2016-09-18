import {forceSimulation, forceX, forceY, forceCollide, select} from 'd3'

const SIM_STEPS = 200

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
export default function circleChart(config) {
    var x = config.xScale
    var yBaseline = config.yBaseline || 20
    var radius = config.radius || 5

    // For force sim beeswarm example, see
    // http://bl.ocks.org/mbostock/6526445e2b44303eebf21da3b6627320
    const sim = forceSimulation(config.data)
        .force('x', forceX(x.fromDateString({ propName: config.timeProp })).strength(1))
        .force('y', forceY(yBaseline))
        .force('collide', forceCollide(5.5))
        .stop()
    for (let i = 0; i < SIM_STEPS; ++i) sim.tick()

    const groups = config.el.append('g')
        .selectAll('g.item')
        .data(config.data)
        .enter().append('g')
            .attr('className', 'item')

    const links = groups.append('a')
            .attr('xlink:href', d => d[config.urlProp])
            .attr('transform', d => `translate(${d.x}, ${d.y})`)

    links.append('circle')
            .attr('r', radius)
            .attr('fill', 'blue')

    links.append('line')
            .attr('x1', 1)
            .attr('x2', 1)
            .attr('y1', function() {
                const circle = select(this.parentElement.firstChild)
                return 3 + parseFloat(circle.attr('r'))
            })
            .attr('y2', function() { return parseFloat(select(this).attr('y1')) + 40 })

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

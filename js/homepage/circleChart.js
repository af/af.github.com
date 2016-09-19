import {forceSimulation, forceX, forceY, forceCollide, select} from 'd3'

const SIM_STEPS = 200
const PADDING = 0.5

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
    const x = config.xScale
    const yBaseline = config.yBaseline || 20
    const radius = config.radius || 5

    // For force sim beeswarm example, see
    // http://bl.ocks.org/mbostock/6526445e2b44303eebf21da3b6627320
    const collisionForce = forceCollide().radius(d => radius(d) + PADDING)
    const sim = forceSimulation(config.data)
        .force('x', forceX(x.fromDateString({ propName: config.timeProp })).strength(1))
        .force('y', forceY(yBaseline))
        .force('collide', collisionForce)
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
            .attr('transform', d => `translate(5, ${radius(d) + 20})`)
    links.append('text').attr('class', 'date')
            .text(d => (new Date(d[config.timeProp])).toISOString().split('T')[0])
            .attr('transform', d => `translate(5, ${radius(d) + 35})`)
}

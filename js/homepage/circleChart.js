import {forceSimulation, forceManyBody, forceCenter, select} from 'd3'

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

    const groups = config.el.append('g')
        .selectAll('g.item')
        .data(config.data)
        .enter().append('g')
            .attr('className', 'item')

    const links = groups.append('a')
            .attr('xlink:href', d => d[config.urlProp])

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

    // For force sim example, see https://bl.ocks.org/mbostock/4062045
    forceSimulation()
        .nodes(config.data)
        .force('charge', forceManyBody())
        .force('center', forceCenter())
        .on('tick', () => {
            // TODO: figure out how force layout actually works and update
            // this part (may need to use links as well)
            links.attr('transform', d => {
                const xVal = x.fromDateString({ propName: config.timeProp })(d)
                return `translate(${xVal}, ${yBaseline})`
            })
        })
}

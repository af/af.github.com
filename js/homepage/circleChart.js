import {forceSimulation, forceManyBody, forceCenter} from 'd3'

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

    const circles = config.el.append('g')
        .selectAll('circle')
        .data(config.data)
        .enter().append('circle')
            .attr('r', radius)
            .attr('fill', 'blue')

    // For force sim example, see https://bl.ocks.org/mbostock/4062045
    const sim = forceSimulation()
        .nodes(config.data)
        .force('charge', forceManyBody())
        .force('center', forceCenter())
        .on('tick', () => {
            circles.attr('cx', d => d.x)
                   .attr('cy', d => d.y)
        })
// 
//     var bubbleChart = forceChart()
//         .size([config.width, 300])  // FIXME
//         .padding(1)
//         .x(x.fromDateString({ propName: config.timeProp }))
//         .xStart(x.fromDateString({ propName: config.timeProp }))
//         .y(yBaseline)
//         .yStart(d => yBaseline + 10 - (20 * Math.random()))
//         .r(radius)
//         .xGravity(8)    // make the x-position more accurate
//         .yGravity(5)    // ...and the y-position more flexible
// 

    // var links = groups.append('a')
    //         .attr('xlink:href', d => d[config.urlProp])

    // links.append('circle')
    //     .attr('r', d => d.r0)
    //     .attr('fill', 'slategrey')

    // links.append('line')
    //         .attr('x1', 1)
    //         .attr('x2', 1)
    //         .attr('y1', function(d) {
    //             var radius = parseFloat(select(this.parentElement.firstChild).attr('r'))
    //             return radius + 3
    //         })
    //         .attr('y2', function() { return parseFloat(select(this).attr('y1')) + 40 })

    // links.append('text')
    //         .text(d => d[config.titleProp])
    //         .attr('transform', function(d) {
    //             var xVal = 5
    //             var y = radius(d) + 20
    //             return 'translate(' + [xVal,y].join(',') + ')'
    //         })
    // links.append('text').attr('class', 'date')
    //         .text(d => (new Date(d[config.timeProp])).toISOString().split('T')[0])
    //         .attr('transform', function(d) {
    //             var xVal = 5
    //             var y = radius(d) + 35
    //             return 'translate(' + [xVal,y].join(',') + ')'
    //         })
}

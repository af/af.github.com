import {forceSimulation, forceX, forceY, forceCollide, select} from 'd3'

const SIM_STEPS = 20
const PADDING = 1


// Simple chart mapping content as circles along a time axis.
export default function circleChart(config) {
    const {rootEl, scale, data = []} = config
    const t = d => Math.floor(scale(new Date(d.date)))

    // For force sim beeswarm example, see
    // http://bl.ocks.org/mbostock/6526445e2b44303eebf21da3b6627320
    const collisionForce = forceCollide().radius(d => d.radius + PADDING)
    const sim = forceSimulation(data)
        .force('x', forceX(d => d.initialX))
        .force('y', forceY(t).strength(1))
        .force('collide', collisionForce)
        .stop()
    for (let i = 0; i < SIM_STEPS; ++i) sim.tick()

    const groups = rootEl.append('g')
        .selectAll('g.item')
        .data(data.filter(d => t(d) > 0))
        .enter().append('g')
            .attr('class', 'item')

    const links = groups.append('a')
            .attr('xlink:href', d => d.url)
            .attr('transform', d => `translate(${d.x}, ${d.y})`)

    links.append('circle')
        .attr('class', d => d.bubbleClass)
        .attr('r', d => d.radius)

    const tooltips = links.append('g').attr('class', 'tooltip')
    tooltips.append('text')
        .text(d => {
            // Manually ellipsis out titles, since we can't really on <text> via css
            const MAX_LENGTH = 60
            return d.title.length > MAX_LENGTH
                ? `${d.title.slice(0, MAX_LENGTH)}…`
                : d.title
        })
        .attr('class', 'tooltipText')
        .attr('text-anchor', 'start')
        .attr('transform', d => `translate(${-d.x}, -${d.radius + 45})`)

    tooltips.append('text')
        .attr('class', 'date tooltipText')
        .attr('text-anchor', 'start')
        .text(d => (new Date(d.date)).toISOString().split('T')[0])
        .attr('transform', d => `translate(${-d.x}, -${d.radius + 30})`)

    tooltips.append('polyline')
        .attr('class', 'tooltipLine')
        .attr('points', function(d) {
            const circle = select(this.parentElement.parentElement.firstChild)
            const aboveCircle = -1 * (parseFloat(circle.attr('r')) + 3)
            const topOfLine = aboveCircle - 20
            return `1,${aboveCircle} 1,${topOfLine} -${d.x},${topOfLine}`
        })
}

import {forceSimulation, forceX, forceY, forceCollide, select} from 'd3'

const SIM_STEPS = 200
const PADDING = 0.5
const HALF_WIDTH = window.innerWidth / 2


// Simple chart mapping content as circles along a time axis.
export default function circleChart(config) {
    const {rootEl, scale, data = []} = config
    const t = d => Math.floor(scale(new Date(d.date)))
    const toRight = d => (t(d) > HALF_WIDTH)

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

    links.append('line')
            .attr('x1', 1)
            .attr('x2', 1)
            .attr('y1', function() {
                const circle = select(this.parentElement.firstChild)
                return 3 + parseFloat(circle.attr('r'))
            })
            .attr('y2', function() { return parseFloat(select(this).attr('y1')) + 40 })

    const tooltips = links.append('g').attr('class', 'tooltip')
    tooltips.append('text')
            .text(d => {
                // Manually ellipsis out titles, since we can't really on <text> via css
                const MAX_LENGTH = 50
                return t.length > MAX_LENGTH ? `${d.title.slice(0, MAX_LENGTH)}…` : d.title
            })
            .attr('class', 'tooltipText')
            .attr('text-anchor', d => (toRight(d) ? 'end' : 'start'))
            .attr('transform', d => `translate(${toRight(d) ? -5 : 5}, ${d.radius + 20})`)
    tooltips.append('text')
            .attr('class', 'date tooltipText')
            .attr('text-anchor', d => (toRight(d) ? 'end' : 'start'))
            .text(d => (new Date(d.date)).toISOString().split('T')[0])
            .attr('transform', d => `translate(${toRight(d) ? -5 : 5}, ${d.radius + 35})`)
}

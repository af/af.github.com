import {forceSimulation, forceX, forceY, forceCollide} from 'd3-force'
import {select} from 'd3-selection'

const SIM_STEPS = 20
const PADDING = 1


// Simple chart mapping content as circles along a time axis.
export default function circleChart({svgEl, rootSelection, scale, data = []}) {
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

    const groups = rootSelection.append('g')
        .selectAll('g.item')
        .data(data.filter(d => t(d) > 0))
        .enter().append('g')
        .attr('class', 'item')

    const links = groups.append('a')
        .attr('xlink:href', d => d.url)
        .attr('transform', d => `translate(${d.x}, ${d.y})`)
        .on('mouseover', _ => svgEl.classList.add('tooltipActive'))
        .on('mouseout', _ => svgEl.classList.remove('tooltipActive'))

    links.append('circle')
        .attr('class', d => d.bubbleClass)
        .attr('r', d => d.radius)

    const TOOLTIP_TEXT_PADDING = 8
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
        .attr('transform', d => `translate(${TOOLTIP_TEXT_PADDING}, -${d.radius + 35})`)

    tooltips.append('text')
        .attr('class', 'date tooltipText')
        .attr('text-anchor', 'start')
        .text(d => (new Date(d.date)).toISOString().split('T')[0])
        .attr('transform', d => `translate(${TOOLTIP_TEXT_PADDING}, -${d.radius + 20})`)

    links.append('line')
        .attr('class', 'tooltipLine')
        .attr('x1', 1)
        .attr('x2', 1)
        .attr('y1', function() {
            const circle = select(this.parentElement.firstChild)
            return -1 * (parseFloat(circle.attr('r')) + 3)
        })
        .attr('y2', function() { return parseFloat(select(this).attr('y1')) - 45 })
}

const COMET_SPACING = 25

// Convert Github repository API data into a "comet" date chart
export default function(config) {
    var x = config.xScale
    var createdAtX = x.fromDateString({ propName: 'created_at' })

    var drawComet = function(d) {
        var height = 4 + Math.floor(Math.sqrt(d.size)/2)
        var width = x(new Date(d.pushed_at)) - createdAtX(d)
        width = Math.max(20, width)

        // Use a template string to express the "d" attribute for the comet's path
        return `M0 2 Q${width} 0 ${width-10} ${height} ` +
               `L${width} 0 L${width-10} ${-1*height} Q${width} 0 0 -2`
    }

    var dataLength = (config.data || []).length
    var all = config.el.selectAll('g.repo').data(config.data)
    var enter = all.enter().append('g')
                    .attr('class', 'repo')
                    .attr('transform-origin', createdAtX + ' 0')
                    .attr('opacity', 0)
    enter.transition()
            .delay((d, i) => (dataLength - i)*100)
            .duration(500).attr('opacity', 1)

    var links = enter.append('a').attr('xlink:href', d => d.html_url)

    // Add rects to expand the hoverable area:
    links.append('rect')
            .attr('width', (d) => x(new Date(d.pushed_at)) - createdAtX(d))
            .attr('height', COMET_SPACING)
            .attr('transform', (d, i) =>
                "translate(" + createdAtX(d) + "," + (15 + i*COMET_SPACING) + ")"
            )

    // Draw "comet" shape for each repo:
    links.append('path')
            .attr('d', drawComet)
            .attr('transform', (d, i) =>
                "translate(" + createdAtX(d) + "," + (30 + i*COMET_SPACING) + ")"
            )

    // Repo text is in one <text> element with several <tspan>s
    var text = links.append('text').attr('class', 'name')
            .attr('transform', (d, i) => {
                var x = Math.max(createdAtX(d), -20)   // -20 negates left-side padding
                return "translate(" + x + "," + (25 + i*COMET_SPACING) + ")"
            })
            .text(d => d.name)
    text.append('tspan')
        .attr('class', 'language')
        .attr('dx', 10)
        .text(d => d.language)
    text.append('tspan')
        .attr('class', 'description')
        .attr('dx', 10)
        .text(d => d.description)
}

import React, { useEffect, useRef } from 'react'
import { axisLeft, axisTop } from 'd3-axis'
import { scaleOrdinal, scaleTime } from 'd3-scale'
import { timeMonth, timeYear } from 'd3-time'
import { select } from 'd3-selection'

import beeswarm from './Beeswarm'
import type { PinboardLink } from './types'

type Props = {
  links?: Array<PinboardLink>
}

const DAYS_OF_HISTORY = 365
const START_DATE = new Date(Date.now() - DAYS_OF_HISTORY * 24 * 3600 * 1000)

const CATEGORY_LANES = {
  typescript: -0.3,
  programming: -0.1,
  design: 0.1,
  other: 0.3,
} as const
const TAGS = Object.keys(CATEGORY_LANES)

const renderTimeline = async (svg: SVGSVGElement, links: Array<PinboardLink>) => {
  const { width, height, display } = getComputedStyle(svg)
  if (display === 'none') return // Don't do expensive rendering on mobile (svg is hidden)

  const [svgWidth, svgHeight] = [parseInt(width, 10), parseInt(height, 10)]
  const margin = { top: 30, right: 0, left: 0, bottom: 10 }
  const leavePadding = `translate(${svgWidth / 2}, ${margin.top})`

  const tScale = scaleTime()
    .range([svgHeight - margin.top - margin.bottom, margin.top])
    .domain([START_DATE, new Date()])

  // Set up an axis above the chart with category labels
  const ordScale = scaleOrdinal()
    .domain(Object.keys(CATEGORY_LANES))
    .range(Object.values(CATEGORY_LANES).map((v) => v * svgWidth))
  const catAxis = select('.categoryAxis')
  // @ts-ignore
  catAxis.attr('transform', leavePadding).call(axisTop(ordScale))
  catAxis
    .selectAll('text')
    .data(Object.keys(CATEGORY_LANES))
    .attr('class', (d) => d)

  // Set up a time axis and put it in the middle
  const makeAxis = () => axisLeft(tScale).tickSize(120)
  select('.yearAxis')
    .attr('transform', leavePadding)
    .call(makeAxis().ticks(timeYear) as any)

  // A separate month axis is also rendered for finer-grained ticks
  const nonZeroMonths = timeMonth.filter((d) => d.getUTCMonth() !== 0)
  select('.monthAxis')
    .attr('transform', leavePadding)
    .call(makeAxis().ticks(nonZeroMonths) as any)

  // Divide links into tag group "buckets":
  const getGroupForLink = (link: PinboardLink) => TAGS.find((t) => link?.t?.includes(t)) || 'other'

  const linkChartData = links.map((l: PinboardLink) => {
    const group = getGroupForLink(l)
    const isTopLink = l.t.includes('top')
    return {
      radius: 6 * (isTopLink ? 1.5 : 1),
      bubbleClass: `link ${group} ${isTopLink ? 'top' : ''}`,
      initialX: svgWidth * CATEGORY_LANES[group as keyof typeof CATEGORY_LANES],
      date: l.dt,
      url: l.u,
      title: l.d,
    }
  })

  beeswarm({
    data: linkChartData,
    scale: tScale,
    svgEl: svg,
    rootSelection: select('.bubbleRoot').append('g').attr('transform', leavePadding),
  })
}

const LinksTimeline = ({ links }: Props) => {
  const timelineRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!timelineRef.current || !links) return
    renderTimeline(timelineRef.current, links)
  }, [links])

  return (
    <svg ref={timelineRef} className="timelineChart" width="350" height="1000">
      <title>Links Timeline</title>
      <g className="categoryAxis"></g>
      <g className="yearAxis"></g>
      <g className="monthAxis"></g>
      <g className="bubbleRoot"></g>
    </svg>
  )
}

export default LinksTimeline

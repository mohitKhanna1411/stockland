import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import {tParser,sortByDateAscending} from '../../../utils/helpers'
const LineChart = ({data}) => {
	const d3Chart = useRef()
    useEffect(() => {
        
    data.forEach((d) => {
        d['Published Date'] = tParser(d['Published Date'])
    })
    data = data.sort(sortByDateAscending)
	
    // console.log(typeof data[0]['Published Date'])

				const margin = {top: 20, right: 30, bottom: 30, left: 30}
				const width = 1440
				const height = 300

				// Set up chart
				const svg = d3.select(d3Chart.current)
								.attr('width', width + margin.left + margin.right)
								.attr('height', height + margin.top + margin.bottom)
								.append('g')
									.attr('transform', 'translate('+ margin.left + ',' + margin.top + ')');

				// x axis scale 
				const x = d3.scaleTime()
							.domain(d3.extent(data, function(d){return d['Published Date']}))
							.range([0,width])
				svg.append('g')
					.attr('transform', 'translate(0,' + height + ')')
					.call(d3.axisBottom(x))

				// Get the max value of counts
				const max = d3.max(data, function(d){return d['occurrence']})
                console.log(max)
				// y axis scale 
				const y = d3.scaleLinear()
							.domain([0, max])
							.range([height,0])

				svg.append('g')
					.call(d3.axisLeft(y))


				// Draw line
				svg.append('path')
					.datum(data)
					.attr('fill', 'none')
					.attr('stroke','steelblue')
					.attr('stroke-width', 3)
					.attr('d', d3.line()
								.x(function(d){return x(d['Published Date'])})
								.y(function(d){return y(d['occurrence'])})
				)
},[data])

	return (
		<div id='d3demo'>
			<svg ref={d3Chart}></svg>
		</div>
	)
}

export default LineChart;
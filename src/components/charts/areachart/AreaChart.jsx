import React, { useEffect, useRef } from "react";
import {
  select,
  axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
  area,
  scalePoint,
  curveCardinal
} from "d3";
import useResizeObserver from "./useResizeObserver";

const keys = ["Residential","Retail", "Mixed BU", "Unknown"];

const colors = {
    'Residential' : "rgb(254,98,10,0.8)",
    'Retail': "rgba(69, 0, 0, 0.8)",
    'Mixed BU': "rgba(240, 72, 19, 0.8)",
    'Unknown': "rgba(255, 199, 128, 0.8)"
};
/**
 * Component that renders a StackedBarChart
 */
// const keys
const AreaChart = ({ data }) => {
	data.sort((a, b) => a['Published Date'].localeCompare(b['Published Date']))
	// console.log(data)
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
	useEffect(() => {
		const svg = select(svgRef.current);
		const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();

		// stacks / layers
		const stackGenerator = stack()
			.keys(keys)
			.order(stackOrderAscending);
		const layers = stackGenerator(data);
		const extent = [
			0,
			max(layers, layer => max(layer, sequence => sequence[1]))
		];

		// scales
		const xScale = scalePoint()
			.domain(data.map(d => d['Published Date']))
			.range([0, width]);

		const yScale = scaleLinear()
			.domain(extent)
			.range([height, 0]);

		// area generator
		const areaGenerator = area()
			.x(sequence => xScale(sequence.data['Published Date']))
      .y0(sequence => yScale(sequence[0]))
      .y1(sequence => yScale(sequence[1]))
      .curve(curveCardinal);

    // rendering
    svg
      .selectAll(".layer")
      .data(layers)
      .join("path")
      .attr("class", "layer")
      .attr("fill", layer => colors[layer.key])
      .attr("d", areaGenerator);

    // axes
    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);
  }, [colors, data, dimensions, keys]);

  return (
    <React.Fragment><></>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  );
}

export default AreaChart;
import React, { useState, useEffect, useRef } from "react";
import {
  select,
  scaleBand,
  axisBottom,
  axisLeft,
  scaleLinear,
  stack,
  max
} from "d3";
// const mainKey = 'Classification Type'
export const Graph = ({ datasets, keys, colors,mainKey }) => {
    const [data, setData] = useState(datasets);
    const svgRef = useRef();
    const wrapperRef = useRef();
    useEffect(() => {
        setData(datasets)
    },[datasets])
    useEffect(() => {
        const svg = select(svgRef.current);
        const { width, height } = wrapperRef.current.getBoundingClientRect();
        // console.log(width, height);
      
        const stackGenerator = stack().keys(keys);
        const layers = stackGenerator(data);
        const extent = [
        0,
        max(layers, (layer) => max(layer, (sequence) => sequence[1]))
            ];
        const yScale = scaleLinear().domain(extent).range([height, 0]);

        const x0Scale = scaleBand()
        .domain(data.map((d) => d[mainKey]))
        .range([0, width])
        .padding(0.46);
    
        const xAix = axisBottom(x0Scale);
        const yAix = axisLeft(yScale);

    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAix);
    svg
      .select(".y-axis")
      .attr("transform", `translate(${0 + 25}, 0 )`)
      .call(yAix);

    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (layer) => colors[layer.key])
      .selectAll("rect")
      .data((layer) => layer)
      .join("rect")
      .attr(
        "x",
        (sequence) => x0Scale(sequence.data[mainKey])
      )
      .attr("width", x0Scale.bandwidth())
      .attr("y", (sequence) => yScale(sequence[1]))
      .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]));

    svg
      .select(".x-axis")
      .selectAll(".tick")
      .on("click", (e) => {
        const filteredD = data.map((d) => {
          return {
            mainKey: d[mainKey],
            'Positive': d[mainKey] === e ? 0 : d.Positive,
            'Negative': d[mainKey] === e ? 0 : d.Negative,
            'Neutral': d[mainKey] === e ? 0 : d.Neutral
          };
        });
        setData(filteredD);
      });
  }, [data, keys, colors,mainKey]);

  return (
    <>
      <div
        ref={wrapperRef}
        style={{ width: "100%", height: "400px", marginBottom: "2rem" }}
      >
        <svg ref={svgRef} style={{ width: "100%", height: "110%" }}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </>
  );
};

import React, { useState } from "react";
import * as d3 from "d3";
import { useD3 } from "./useD3";

function ScatterChart({ data }) {
  const [size, setSize] = useState(1);

  const ref = useD3(
    (svg) => {
      svg.selectAll("*").remove();

      const xScale = d3.scaleLinear().domain([0, 5]).range([0, 800]);
      const yScale = d3.scaleLinear().domain([0, 100]).range([500, 0]);
      const rScale = d3.scaleSqrt().domain([0, 5]).range([1, 30]);

      const g = svg.append("g");

      const dataSubset = data.filter((item) => item.size === size);

      g.selectAll("circle")
        .data(dataSubset, (d) => d.color + d.speed) // use a key function to correctly bind data
        .join("circle")
        .attr("cx", (d) => xScale(d.speed))
        .attr("cy", (d) => yScale(d.percent))
        .attr("r", (d) => rScale(d.size))
        .attr("fill", (d) => d.color);

      g.append("g")
        .attr("transform", "translate(0,500)")
        .call(d3.axisBottom(xScale).ticks(5));

      g.append("g").call(d3.axisLeft(yScale).ticks(5));

      g.append("text").attr("y", 520).text(`Size: ${size}`);

      svg
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .style("text-anchor", "middle")
        .text("Percentage Tracking Time")
        .attr("transform", "translate(-60,250)rotate(-90)");
    },
    [JSON.stringify(data), size] // re-render when data or size state changes
  );

  return (
    <>
      <button
        onClick={() => setSize((prevSize) => (prevSize < 5 ? prevSize + 1 : 1))}
      >
        Change size
      </button>
      <svg
        ref={ref}
        style={{
          height: 520,
          width: 800,
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        <g className='plot-area' />
        <g className='x-axis' />
        <g className='y-axis' />
      </svg>
    </>
  );
}

export default ScatterChart;

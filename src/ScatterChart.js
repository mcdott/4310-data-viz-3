import React, { useState } from "react";
import * as d3 from "d3";
import { useD3 } from "./useD3";

function ScatterChart({ data }) {
  const [size, setSize] = useState(1);

  const ref = useD3(
    (svg) => {
      svg.selectAll("*").remove();

      const margin = { top: 50, right: 20, bottom: 50, left: 100 }; // Adjust the top margin to give space for the title
      const width = 800 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const xScale = d3.scaleLinear().domain([0, 5]).range([0, width]);
      const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);
      const rScale = d3.scaleSqrt().domain([0, 5]).range([1, 30]);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const dataSubset = data.filter((item) => item.size === size);

      g.selectAll("circle")
        .data(dataSubset, (d) => d.color + d.speed)
        .join("circle")
        .attr("cx", (d) => xScale(d.speed))
        .attr("cy", (d) => yScale(d.percent))
        .attr("r", (d) => rScale(d.size))
        .attr("fill", (d) => d.color)
        .attr("fill-opacity", 0.5);

      const xAxis = d3
        .axisBottom(xScale)
        .tickValues([1, 2, 3, 4, 5])
        .tickFormat((d) => {
          switch (d) {
            case 1:
              return "very very slow";
            case 2:
              return "very slow";
            case 3:
              return "slow";
            case 4:
              return "regular speed";
            case 5:
              return "fast";
            default:
              return d;
          }
        });

      let sizeText;
      switch (size) {
        case 1:
          sizeText = "s";
          break;
        case 2:
          sizeText = "m";
          break;
        case 3:
          sizeText = "l";
          break;
        case 4:
          sizeText = "xl";
          break;
        case 5:
          sizeText = "xxl";
          break;
        default:
          sizeText = size;
      }

      g.append("g").attr("transform", `translate(0,${height})`).call(xAxis);

      g.append("g").call(d3.axisLeft(yScale).ticks(5));

      g.append("text")
        .attr("y", height + margin.bottom / 2)
        .text(`Size: ${sizeText}`);

      // Add a title to the chart
      svg
        .append("text")
        .attr("x", width / 2 + margin.left) // Position the title in the middle of the chart
        .attr("y", margin.top / 2) // Position the title halfway up the margin
        .attr("text-anchor", "middle") // Centre the text
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .text(
          "Eye Tracking Success vs Target Speed, Target Colour, Target Size"
        );
    },
    [JSON.stringify(data), size]
  );

  return (
    <>
      <svg
        ref={ref}
        style={{
          height: 570,
          width: 900,
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        <g className='plot-area' />
        <g className='x-axis' />
        <g className='y-axis' />
      </svg>
      <button
        onClick={() => setSize((prevSize) => (prevSize < 5 ? prevSize + 1 : 1))}
      >
        Change size
      </button>
    </>
  );
}

export default ScatterChart;

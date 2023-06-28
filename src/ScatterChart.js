import React, { useState } from "react";
import * as d3 from "d3";
import { useD3 } from "./useD3";

function ScatterChart({ data }) {
  const [size, setSize] = useState(1);

  const ref = useD3(
    (svg) => {
      svg.selectAll("*").remove();

      const margin = { top: 50, right: 20, bottom: 50, left: 100 };
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
        .attr("fill-opacity", 0.6);

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
          sizeText = "S";
          break;
        case 2:
          sizeText = "M";
          break;
        case 3:
          sizeText = "L";
          break;
        case 4:
          sizeText = "XL";
          break;
        case 5:
          sizeText = "XXL";
          break;
        default:
          sizeText = size;
      }

      // x-axis
      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis)
        .selectAll("text")
        .style("font-size", "16px");

      // x-axis label
      g.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom)
        .style("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "20px")
        .text("Target Speed");

      // y-axis
      g.append("g")
        .call(d3.axisLeft(yScale).ticks(5))
        .selectAll("text")
        .style("font-size", "16px");

      // y-axis label
      g.append("text")
        .attr("x", -height / 2)
        .attr("y", -margin.left / 2)
        .attr("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", "20px")
        .attr("transform", "rotate(-90)")
        .text("Tracking Success (% of time on target)");

      // size label
      g.append("text")
        .attr("y", height + margin.bottom * 2)
        .text(`Target Size: ${sizeText}`)
        .style("fill", "white")
        .style("font-size", "20px");

      // title
      svg
        .append("text")
        .attr("x", width / 2 + margin.left) // Position the title in the middle of the chart
        .attr("y", margin.top * 0.5) // Position the title halfway up the margin
        .attr("text-anchor", "middle") // Centre the text
        .style("font-size", "26px")
        .style("fill", "white")
        .text("Eye Tracking Success vs Target Speed, Colour, and Size");
    },
    [JSON.stringify(data), size]
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginTop: "70px",
        marginBottom: "100px",
      }}
    >
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
        style={{
          marginLeft: "100px",
          backgroundColor: "white",
          marginTop: "0px",
        }}
        onClick={() => setSize((prevSize) => (prevSize < 5 ? prevSize + 1 : 1))}
      >
        Change size
      </button>
    </div>
  );
}

export default ScatterChart;

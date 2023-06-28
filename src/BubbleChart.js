import * as d3 from "d3";
import { useD3 } from "./useD3";
import { useState } from "react";

function BubbleChart({ data }) {
  const [scale, setScale] = useState([0, 100]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const ref = useD3(
    (svg) => {
      svg.selectAll("*").remove(); // Clear svg before each render
      const margin = { top: 20, right: 30, bottom: 60, left: 60 };
      const width = 800 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      // Define speed array to map numbers to category names
      const speeds = [
        "",
        "very very slow",
        "very slow",
        "slow",
        "medium speed",
        "fast",
      ];

      const xScale = d3
        .scaleBand()
        .domain(speeds)
        .range([0, width])
        .paddingInner(0.05);

      const yScale = d3
        .scaleLinear()
        .domain(scale) // takes the scale state
        .range([height, 0]);

      const colorScale = d3
        .scaleOrdinal()
        .domain(data.map((d) => d.color))
        .range(["red", "yellow", "black", "white", "grey"]);

      const radius = d3
        .scaleSqrt()
        .domain([1, 5]) // size ranges from 1 (xs) to 5 (xl)
        .range([10, 50]);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      g.selectAll(".bubble")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "bubble")
        .attr("cx", (d) => xScale(speeds[d.speed]) + xScale.bandwidth() / 2) // center the bubbles
        .attr("cy", (d) => yScale(d.percent))
        .attr("r", (d) => radius(d.size * 0.5))
        .style("fill", (d) => colorScale(d.color))
        .style("fill-opacity", 0.4)
        .style("stroke", (d) => colorScale(d.color))
        .style("stroke-width", 3)
        .style("stroke-opacity", 1);

      // Add the X Axis
      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("class", "axis-label")
        .attr("y", 40)
        .attr("x", width / 2)
        .attr("text-anchor", "middle")
        .text("Speed");

      // Add the Y Axis
      g.append("g")
        .call(d3.axisLeft(yScale))
        .append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x", -(height / 2))
        .attr("text-anchor", "middle")
        .text("Percent tracked");
    },
    [JSON.stringify(data), scale]
  );

  const handleChange = () => {
    if (start && end && !isNaN(start) && !isNaN(end)) {
      setScale([+start, +end]);
    }
  };

  return (
    <div>
      <label>
        Start:
        <input
          type='text'
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </label>
      <label>
        End:
        <input
          type='text'
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </label>
      <button onClick={handleChange}>Change Scale</button>
      <button onClick={() => setScale([0, 100])}>Reset Scale</button>
      <svg
        ref={ref}
        style={{
          height: 500,
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
      >
        <g className='plot-area' />
        <g className='x-axis' />
        <g className='y-axis' />
      </svg>
    </div>
  );
}

export default BubbleChart;

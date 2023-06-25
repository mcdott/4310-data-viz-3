import * as d3 from "d3";
import { useD3 } from "./useD3";

function BubbleChart({ data }) {
  const ref = useD3(
    (svg) => {
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
        .domain([0, 100]) // percent ranges from 0 to 100
        .range([height, 0]);

      const colorScale = d3
        .scaleOrdinal()
        .domain(data.map((d) => d.color))
        .range(["red", "yellow", "black", "white", "blue"]);

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
        .attr("r", (d) => radius(d.size))
        .style("fill", (d) => colorScale(d.color));

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
    [JSON.stringify(data)]
  );

  return (
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
  );
}

export default BubbleChart;

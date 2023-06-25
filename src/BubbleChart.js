import * as d3 from "d3";
import { useD3 } from "./useD3";

function BubbleChart({ data }) {
  const ref = useD3(
    (svg) => {
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 800 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      const xScale = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.speed))
        .range([0, width]);

      const yScale = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.size))
        .range([height, 0]);

      const colorScale = d3
        .scaleOrdinal()
        .domain(data.map((d) => d.color))
        .range(["red", "yellow", "black", "white", "blue"]);

      const radius = d3
        .scaleSqrt()
        .domain([0, d3.max(data, (d) => d.percent)])
        .range([0, 50]);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      g.selectAll(".bubble")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "bubble")
        .attr("cx", (d) => xScale(d.speed))
        .attr("cy", (d) => yScale(d.size))
        .attr("r", (d) => radius(d.percent))
        .style("fill", (d) => colorScale(d.color));

      // Add the X Axis
      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

      // Add the Y Axis
      g.append("g").call(d3.axisLeft(yScale));
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
    ></svg>
  );
}

export default BubbleChart;

import * as d3 from "d3";
import { useD3 } from "./useD3";

function FacetedScatterChart({ data }) {
  const colors = ["red", "yellow", "black", "white", "blue"];

  const ref = useD3(
    (svg) => {
      svg.selectAll("*").remove(); // Clear svg before each render

      // Define margins
      const margin = { top: 20, right: 20, bottom: 60, left: 60 };

      const facetSize = Math.sqrt(data.length) * 10;
      const facetMargin = 10;

      // Create color scale
      const color = d3.scaleOrdinal().domain(colors).range(colors);

      // Nest data by size
      const dataBySize = d3.group(data, (d) => d.size);

      // Create x and y scales
      const xScale = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.speed))
        .range([facetMargin, facetSize - facetMargin]);

      const yScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([facetSize - facetMargin, facetMargin]);

      // Create x and y axes
      const xAxis = d3.axisBottom(xScale).ticks(5);
      const yAxis = d3.axisLeft(yScale).ticks(5);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      Array.from(dataBySize.keys()).forEach((size, i) => {
        const sizeData = dataBySize.get(size);
        const row = Math.floor(i / Math.sqrt(dataBySize.size));
        const col = i % Math.sqrt(dataBySize.size);

        const gx = g
          .append("g")
          .attr(
            "transform",
            `translate(${col * facetSize}, ${row * facetSize})`
          );

        gx.selectAll("circle")
          .data(sizeData)
          .join("circle")
          .attr("cx", (d) => xScale(d.speed))
          .attr("cy", (d) => yScale(d.percent))
          .attr("r", 3)
          .attr("fill", (d) => color(d.color));

        gx.append("g")
          .attr("transform", `translate(0, ${facetSize - facetMargin})`)
          .call(xAxis);

        const gy = gx
          .append("g")
          .attr("transform", `translate(${facetMargin}, 0)`)
          .call(yAxis);

        // Add y-axis label
        gy.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", -facetMargin)
          .attr("x", -facetSize / 2)
          .attr("dy", "1em")
          .style("text-anchor", "middle")
          .text("Percentage Tracking Time");

        gx.append("text")
          .attr("x", facetSize / 2)
          .attr("y", facetSize + facetMargin)
          .attr("text-anchor", "middle")
          .text(`Size ${size}`);
      });
    },
    [JSON.stringify(data)]
  );

  return (
    <svg
      ref={ref}
      style={{
        height: 800,
        width: 800,
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

export default FacetedScatterChart;

import * as d3 from "d3";
import { useD3 } from "./useD3";

function FacetedScatterChart({ data }) {
  const ref = useD3(
    (svg) => {
      svg.selectAll("*").remove();

      const uniqueSizes = [...new Set(data.map((item) => item.size))];
      const colors = ["red", "yellow", "black", "white", "blue"];

      const colorScale = d3.scaleOrdinal().domain(colors).range(colors);
      const xScale = d3.scaleLinear().domain([0, 5]).range([0, 150]);
      const yScale = d3.scaleLinear().domain([0, 100]).range([150, 0]);

      uniqueSizes.forEach((size, i) => {
        const g = svg.append("g").attr("transform", `translate(${i * 200},0)`); // increase space between charts

        const dataSubset = data.filter((item) => item.size === size);

        g.selectAll("circle")
          .data(dataSubset)
          .enter()
          .append("circle")
          .attr("cx", (d) => xScale(d.speed))
          .attr("cy", (d) => yScale(d.percent))
          .attr("r", 5)
          .attr("fill", (d) => colorScale(d.color));

        g.append("g")
          .attr("transform", "translate(0,150)")
          .call(d3.axisBottom(xScale).ticks(5));

        g.append("g").call(d3.axisLeft(yScale).ticks(5));

        g.append("text").attr("y", 170).text(`Size: ${size}`);
      });

      svg
        .append("text")
        .attr("x", 0)
        .attr("y", 0)
        .style("text-anchor", "middle")
        .text("Percentage Tracking Time")
        .attr("transform", "translate(-50,150)rotate(-90)");
    },
    [JSON.stringify(data)]
  );

  return (
    <svg
      ref={ref}
      style={{
        height: 200,
        width: 1000, // 5 charts * 200 width
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

import * as d3 from "d3";
import { useD3 } from "./useD3";

function FacetedScatterChart({ data }) {
  const ref = useD3(
    (svg) => {
      svg.selectAll("*").remove();

      const uniqueSizes = [...new Set(data.map((item) => item.size))];

      const xScale = d3.scaleLinear().domain([0, 5]).range([0, 150]);
      const yScale = d3.scaleLinear().domain([0, 100]).range([150, 0]);
      const rScale = d3.scaleSqrt().domain([0, 5]).range([2, 10]); // scale for size

      uniqueSizes.forEach((size, i) => {
        const g = svg.append("g").attr("transform", `translate(${i * 200},0)`);

        const dataSubset = data.filter((item) => item.size === size);

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

        g.selectAll("circle")
          .data(dataSubset)
          .enter()
          .append("circle")
          .attr("cx", (d) => xScale(d.speed))
          .attr("cy", (d) => yScale(d.percent))
          .attr("r", (d) => rScale(d.size)) // use the size from data
          .attr("fill", (d) => d.color);

        g.append("g")
          .attr("transform", "translate(0,150)")
          .call(d3.axisBottom(xScale).ticks(5));

        g.append("g").call(d3.axisLeft(yScale).ticks(5));

        g.append("text")
          .attr("y", 200)
          .text(`Size: ${sizeText}`)
          .style("font-size", "20px")
          .style("fill", "white");
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

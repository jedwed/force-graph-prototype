import { useEffect, useRef } from "react";
// import ForceGraph from "./ForceGraph";
import * as d3 from "d3";

function Canvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const nodes = [
      { id: "0" },
      { id: "1" },
      { id: "2" },
      { id: "3" },
      { id: "4" },
      { id: "5" },
      { id: "6" },
    ];
    const edges = [
      { source: "0", target: "1" },
      { source: "1", target: "3" },
      { source: "2", target: "5" },
      { source: "6", target: "3" },
      { source: "5", target: "0" },
    ];
    const svg = d3.select(svgRef.current);
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const simulation = d3
      .forceSimulation()
      .force(
        "link",
        d3.forceLink().id((d) => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));
    const link = svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(edges)
      .enter()
      .append("line")
      .attr("stroke-width", 4);
    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", "green");

    simulation.nodes(nodes).on("tick", ticked);
    simulation.force("link").links(edges);

    function ticked() {
      link
        .attr("x1", function (d) {
          return d.source.x;
        })
        .attr("y1", function (d) {
          return d.source.y;
        })
        .attr("x2", function (d) {
          return d.target.x;
        })
        .attr("y2", function (d) {
          return d.target.y;
        });
      node
        .attr("cx", function (d) {
          return d.x;
        })
        .attr("cy", function (d) {
          return d.y;
        });
    }
  }, []);
  return <svg ref={svgRef} height="1000" width="1000" />;
}

export default Canvas;

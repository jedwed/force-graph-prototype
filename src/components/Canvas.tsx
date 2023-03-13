import { useEffect, useRef } from "react";
// import ForceGraph from "./ForceGraph";
import * as d3 from "d3";

function Canvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const graph = {
    nodes: [
      { id: "0" },
      { id: "1" },
      { id: "2" },
      { id: "3" },
      { id: "4" },
      { id: "5" },
      { id: "6" },
    ],
    edges: [
      { source: "0", target: "1" },
      { source: "1", target: "3" },
      { source: "6", target: "3" },
      { source: "5", target: "0" },
      { source: "1", target: "4" },
      { source: "2", target: "1" },
    ],
  };
  useEffect(() => {
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
      .data(graph.edges)
      .enter()
      .append("line")
      .attr("stroke-width", 4);
    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter()
      .append("circle")
      .attr("r", 15)
      .attr("fill", "green");
    // .enter()
    // .append("text")
    // .text((node) => node.id);
    // .enter();
    const label = svg
      .append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(graph.nodes)
      .enter()
      .append("text")
      .text((node) => node.id);

    simulation.nodes(graph.nodes).on("tick", ticked);
    simulation.force("link").links(graph.edges);

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      label.attr("x", (d) => d.x).attr("y", (d) => d.y);
      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }
    return () => {};
  }, [graph]);
  return <svg ref={svgRef} height="1000" width="1000" />;
}

export default Canvas;

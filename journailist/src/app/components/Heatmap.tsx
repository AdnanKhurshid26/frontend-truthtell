import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { FeatureCollection, Geometry } from "geojson";
import { feature } from "topojson-client";
import { Topology } from "topojson-specification";
import worldDataRaw from "../../../public/maps/world-110m.json";

interface AlertData {
  location: { lat: number; lng: number };
  riskLevel: number;
}

interface HeatmapProps {
  alerts: AlertData[];
}

const Heatmap = ({ alerts }: HeatmapProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800; 
    const height = 450; 

    const worldData = worldDataRaw as unknown as Topology;


    const worldObjects = worldData.objects;
    const geoJson = feature(worldData, worldObjects.countries) as FeatureCollection<Geometry>;

    const projection = geoNaturalEarth1().fitSize([width, height], geoJson);
    const pathGenerator = geoPath().projection(projection);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Draw world map
    svg.append("g")
      .selectAll("path")
      .data(geoJson.features)
      .enter()
      .append("path")
      .attr("d", pathGenerator)
      .attr("fill", "#e5e7eb")
      .attr("stroke", "#6b7280");

    // Scale for heatmap
    const colorScale = d3.scaleSequential(d3.interpolateReds)
      .domain([0, d3.max(alerts, (d) => d.riskLevel) || 1]);

    // Draw heatmap points
    svg.selectAll("circle")
      .data(alerts)
      .enter()
      .append("circle")
      .attr("cx", (d) => {
        const projected = projection([d.location.lng, d.location.lat]);
        return projected ? projected[0] : 0; 
      })
      .attr("cy", (d) => {
        const projected = projection([d.location.lng, d.location.lat]);
        return projected ? projected[1] : 0;
      })
      .attr("r", (d) => Math.max(d.riskLevel / 10 + 5, 5)) 
      .attr("fill", (d) => colorScale(d.riskLevel))
      .attr("opacity", 0.7);
  }, [alerts]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 overflow-hidden">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Global Risk Heatmap</h2>
      <div className="w-full max-w-full overflow-hidden aspect-[16/9]">
        <svg ref={svgRef} width="100%" height="100%" className="rounded-lg" />
      </div>
    </div>
  );
};

export default Heatmap;

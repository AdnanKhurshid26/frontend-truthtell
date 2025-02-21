"use client";

import * as d3 from "d3";
import cloud from "d3-cloud";
import { useEffect, useRef, useState } from "react";

interface AlertData {
  claim: string;
}

interface Word {
  text: string;
  size: number;
  x?: number;
  y?: number;
  rotate?: number;
}

interface WordCloudProps {
  alerts: AlertData[];
}
const WordCloud = ({ alerts }: WordCloudProps) => {
    const [words, setWords] = useState<Word[]>([]);
    const svgRef = useRef<SVGSVGElement>(null);
  
    useEffect(() => {
      if (!alerts.length) return;
  
      const wordsArray = alerts.flatMap((alert) => alert.claim.toLowerCase().split(/\s+/));
      const wordCount: Record<string, number> = {};
      wordsArray.forEach((word) => {
        word = word.replace(/[^a-zA-Z0-9]/g, "");
        if (word) wordCount[word] = (wordCount[word] || 0) + 1;
      });
  
      const sizeScale = d3.scaleSqrt().domain([1, Math.max(...Object.values(wordCount))]).range([12, 50]);
  
      const formattedWords = Object.entries(wordCount).map(([text, count]) => ({
        text,
        size: sizeScale(count),
      }));
  
      setWords(formattedWords);
    }, [alerts]);
  
    useEffect(() => {
      if (!words.length || !svgRef.current) return;
  
      const width = 500;
      const height = 350;
  
      const layout = cloud()
        .size([width, height])
        .words(words)
        .padding(6)
        .rotate(() => (Math.random() > 0.5 ? 0 : 45))
        .fontSize((d) => d.size ?? 5)
        .on("end", draw);
  
      layout.start();
  
      function draw(words: Word[]) {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
  
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  
        const g = svg.attr("viewBox", `0 0 ${width} ${height}`)
          .append("g")
          .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
        g.selectAll("text")
          .data(words)
          .enter()
          .append("text")
          .style("font-size", (d) => `${d.size}px`)
          .style("fill", (d, i) => colorScale(i.toString()))
          .style("font-family", "Arial, sans-serif")
          .style("font-weight", "bold")
          .attr("text-anchor", "middle")
          .attr("transform", (d) => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
          .text((d) => d.text)
          .style("opacity", 0)
          .transition()
          .duration(600)
          .ease(d3.easeCubicInOut)
          .style("opacity", 1);
      }
    }, [words]);
  
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 overflow-hidden">
        <h2 className="text-xl font-semibold text-gray-800">Word Cloud Analysis</h2>
        <div className="w-full max-w-full overflow-hidden aspect-[16/9]">
          <svg ref={svgRef} width="100%" height="100%" className="rounded-lg" />
        </div>
      </div>
    );
  };
  
  export default WordCloud;
  

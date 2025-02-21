"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

type Timestamp = {
  time: number;
  label: string;
};

const timestamps: Timestamp[] = [
  { time: 5, label: "The transcript contains language and references that are highly informal, derogatory, and satirical, which are not typical of a formal or genuine political speech." },
  { time: 12, label: "The use of internet slang, offensive jokes, and exaggerated statements suggests that this is a parody or satirical piece rather than a real spoken audio." },
  { time: 18, label: "The tone is intentionally provocative and comedic, indicating it is likely a scripted or fabricated piece meant for entertainment or satire." },
  { time: 7, label: "Substantial Evidence" },
  { time: 15, label: "Audio Transcript Analysis - Uses semantic understanding of speech to detect misleading audio." },
  { time: 20, label: "Substantial Evidence - 55% confidence" },
  { time: 3, label: "Video Facial Analysis - Analyzes video frames for unusual patterns and discrepancies in facial features." }
];


// Video Stream Component
const MjpegStream = ({ url, title }: { url: string; title: string }) => {
  return (
    <div className="flex flex-col items-center gap-2 w-[600px]">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <div className="w-full h-[340px] bg-black rounded-lg overflow-hidden flex justify-center items-center">
        <img src={url} alt={title} className="w-full h-full object-contain rounded-lg" />

      </div>
    </div>
  );
};

export default function VideoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoParam = searchParams.get("video");

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!videoParam) {
      router.push("/"); // Redirect if no video parameter is provided
    }
  }, [videoParam, router]);

  if (!videoParam || typeof videoParam !== "string") return <p>Loading...</p>;

  // Map videoParam to corresponding channel values
  const channelMap: Record<string, string> = {
    video1: "sample1", // Trump
    video2: "sample0", // Earth
  };

  const selectedChannel = channelMap[videoParam] || "sample0"; // Default to Earth if invalid

  // Constructing the video URLs dynamically
  const rawStreamUrl = `https://truth-python-pub-server-1006843516019.us-central1.run.app/video-stream/video?channel=${selectedChannel}`;
  const processedStreamUrl = `https://truth-python-sub-server-ciouw3rehq-uc.a.run.app/processed-stream/video?channel=${selectedChannel}`;

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Video Streams Side by Side */}
      <div className="flex justify-center items-start gap-8">
        <MjpegStream url={rawStreamUrl} title="Raw Livestream" />
        <MjpegStream url={processedStreamUrl} title="Processed Livestream" />
      </div>

      {/* Scrollable Section */}
      <div
        ref={scrollRef}
        className="w-full max-w-3xl mx-auto h-80 mt-6 p-4 overflow-y-auto border rounded-lg shadow-md bg-gray-100"
      >
        {timestamps.map((ts, index) => (
          <div
            key={index}
            id={`card-${index}`}
            className="p-3 mb-2 bg-red-100 text-red-700 rounded-md shadow-sm flex justify-between items-center"
          >
            <span>{ts.label}</span>
            <button className="text-blue-600 hover:underline">
              {new Date(ts.time * 1000).toISOString().substr(14, 5)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

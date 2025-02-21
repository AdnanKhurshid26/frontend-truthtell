"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Timestamp = {
  time: number;
  label: string;
};

const timestamps: Timestamp[] = [
  { time: 10, label: "This is first fake news" },
  { time: 30, label: "Another fake news" },
  { time: 60, label: "Another fake news" },
  { time: 90, label: "Another fake news" },
];

const MjpegStream = ({ url }: { url: string }) => {
  return (
    <div className="flex justify-center items-center w-full h-auto bg-black">
      <img src={url} alt="Live Stream" className="w-full h-auto rounded-lg" />
    </div>
  );
};

export default function VideoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("video");

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!videoUrl) {
      router.push("/"); // Redirect if no video URL
    }
  }, [videoUrl, router]);

  if (!videoUrl || typeof videoUrl !== "string") return <p>Loading...</p>;

  return (
    <div className="flex flex-1 items-center gap-4 p-4">
      {/* Video Player / MJPEG Stream */}
      <div className="w-7/12 h-full flex flex-col justify-start items-center gap-4">
        <MjpegStream url={videoUrl} />
      </div>

      {/* Scrollable Section */}
      <div
        ref={scrollRef}
        className="w-5/12 max-w-3xl h-full mt-4 p-2 overflow-y-auto border rounded-lg shadow-md bg-gray-100"
      >
        {timestamps.map((ts, index) => (
          <div
            key={index}
            id={`card-${index}`}
            className="p-3 mb-2 bg-red-100 text-red-700 rounded-md shadow-sm flex justify-between items-center"
          >
            <span>{ts.label}</span>
            <button
              className="text-blue-600 hover:underline"
            >
              {new Date(ts.time * 1000).toISOString().substr(14, 5)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

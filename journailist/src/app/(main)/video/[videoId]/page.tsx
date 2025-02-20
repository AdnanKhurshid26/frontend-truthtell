"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

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

export default function VideoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const video = searchParams.get("video");

  const playerRef = useRef<ReactPlayer | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const handleTimestampClick = (time: number, index: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, "seconds");
      setPlaying(true); // Ensure the video starts playing
    }

    // Scroll to the selected card
    const card = document.getElementById(`card-${index}`);
    if (card && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: card.offsetTop - scrollRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!video) {
      router.push("/"); // Redirect if no video URL
    }
  }, [video, router]);

  if (!video || typeof video !== "string") return <p>Loading...</p>;

  return (
    <div className="flex flex-1 items-center gap-4 p-4">
      {/* Video Player */}
      <div className="w-7/12 h-full flex flex-col justify-start items-center gap-4">
        <ReactPlayer
          ref={playerRef}
          url={video}
          controls
          playing={playing}
          width="100%"
          height="auto"
        />
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
              onClick={() => handleTimestampClick(ts.time, index)}
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

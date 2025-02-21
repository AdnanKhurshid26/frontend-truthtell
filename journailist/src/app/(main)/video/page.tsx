"use client";

import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Select } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();

  // Stream options
  const streams = [
    { label: "Trump claims to support Brazil", value: "video1" },
    { label: "Earth", value: "video2" },
  ];

  const [selectedStream, setSelectedStream] = useState(streams[0].value);

  const handleRouting = () => {
    router.push(`/video/videoId?video=${selectedStream}`);
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center py-20 gap-8">
      <div className="text-4xl font-bold text-center text-brand">
        Choose a Livestream to Detect Fake News in Real Time!
      </div>

      {/* Stream Selection Dropdown */}
      <div className="flex flex-col justify-center items-center gap-4">
        <Select
          className="w-96"
          value={selectedStream}
          onChange={(e) => setSelectedStream(e.target.value)}
        >
          {streams.map((stream) => (
            <option key={stream.value} value={stream.value}>
              {stream.label}
            </option>
          ))}
        </Select>

        {/* Go Button */}
        <Button color="primary" onClick={handleRouting}>
          <div className="flex flex-row justify-center items-center gap-1">
            <FontAwesomeIcon icon={faWandMagicSparkles} className="text-base mr-2" />
            <div>Expose Fake News</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Page;

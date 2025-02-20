"use client";

import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();

  const [videoUrl, setVideoUrl] = useState("");

  const handleRouting = () => {
    router.push(`/video/videoId?video=${videoUrl}`);
  };

  return (
    <div className="w-full h-full flex flex-col justify-start items-center py-20 gap-8">
      <div className="text-4xl font-bold text-center text-brand">
        Enter a Livestream Link to Detect Fake News in Real Time!
      </div>
      <div className="flex justify-center items-center gap-4">
        <TextInput
          placeholder="Enter a Livestream Link"
          color="primary"
          type="url"
          className="w-96"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <Button color="primary" onClick={handleRouting}>
          <div className="flex flex-row justify-center items-center gap-1">
            <FontAwesomeIcon
              icon={faWandMagicSparkles}
              className="text-base mr-2"
            />
            <div>Expose Fake News</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Page;

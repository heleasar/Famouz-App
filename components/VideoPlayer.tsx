import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ReactPlayer from "react-player";

const VideoPlayerWrapper: React.FC = () => {
  // Preload a default YouTube link
  const [videoUrl, setVideoUrl] = React.useState("https://www.youtube.com/watch?v=0Bj6QCU3Ggg");

  return (
    <div className="space-y-4 mt-2">
      {/* Input Field for Video URL */}
      <input
        type="text"
        placeholder="Enter video URL (e.g., YouTube or direct link)"
        className="w-full bg-transparent p-2 border rounded outline-none"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />

      {/* Video Player */}
      {videoUrl && (
        <Card className="w-full mx-auto">
          <CardContent className="p-0">
            {/* Video container with aspect-ratio property */}
            <div
              className="relative w-full overflow-hidden rounded-xl"
              style={{ aspectRatio: "16/9" }}
            >
              <ReactPlayer
                url={videoUrl}
                controls
                width="100%"
                height="100%"
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VideoPlayerWrapper;

import React, { useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
// import 'tailwindcss/tailwind.css';

interface VideoContainerProps {
  videoSrc: string;
  coverImage: string;
}

const VideoContainer: React.FC<VideoContainerProps> = ({
  videoSrc,
  coverImage,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayVideo = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handlePauseVideo = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div
      className={`relative w-full h-[440px] bg-gradient-to-r from-[#1F1C2C] to-[#928DAB] bg-cover bg-center cursor-pointer max-h-[448px] ${
        isPlaying ? "" : "bg-gradient-to-r"
      }`}
      onClick={!isPlaying ? handlePlayVideo : undefined}
      style={{
        backgroundImage: isPlaying ? "none" : `url(${coverImage})`,
        backgroundPosition: `center`,
        backgroundSize: `cover`,
      }}
    >
      {!isPlaying && (
        <div
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImage})` }}
        >
          <FaPlay className="text-white text-6xl" />
        </div>
      )}

      {isPlaying && (
        <div
          className="absolute top-0 left-0 h-full w-full blur-md -z-30"
          style={{
            backgroundImage: `url(${coverImage})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        />
      )}

      <video
        ref={videoRef}
        src={videoSrc}
        className={`absolute top-0 left-0 w-full h-full ${
          isPlaying ? "block" : "hidden"
        }`}
        onEnded={handleVideoEnd}
        controls={false}
      />

      {isPlaying && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          {isPlaying ? (
            <FaPause
              className="text-white text-4xl cursor-pointer"
              onClick={handlePauseVideo}
            />
          ) : (
            <FaPlay
              className="text-white text-4xl cursor-pointer"
              onClick={handlePlayVideo}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default VideoContainer;

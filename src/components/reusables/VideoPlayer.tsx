import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import { HiMiniPause, HiMiniPlay } from "react-icons/hi2";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(videoRef, { once: false });

  useEffect(() => {
    if (isInView && !isPaused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isInView, isPaused]);

  const handlePausePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleFullscreenToggle = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-none bg-black-main h-auto lg:h-[380px]"
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1, type: "spring" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src={src}
        className="h-[100%] w-[100%] object-cover"
        controls={false}
        muted={isMuted}
        loop
      />
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
          <button
            className="text-white text-2xl mx-2 size-10 rounded-full bg-gray-950/80 flex items-center justify-center"
            onClick={handlePausePlay}
          >
            {isPaused ? <HiMiniPlay /> : <HiMiniPause />}
            {/* {isPaused ? "▶️" : "⏸️"} */}
          </button>
        </div>
      )}
      {isHovered && (
        <div className="absolute bottom-2 right-2 flex space-x-2">
          <button className="text-white text-xl" onClick={handleMuteToggle}>
            {isMuted ? <FaVolumeXmark /> : <FaVolumeHigh />}
            {/* {isMuted ? "🔇" : "🔊"} */}
          </button>
          <button
            className="text-white text-xl"
            onClick={handleFullscreenToggle}
          >
            ⛶
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default VideoPlayer;

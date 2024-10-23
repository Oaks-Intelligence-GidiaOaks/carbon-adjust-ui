// import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";

const RecorderIndicator = ({
  isPlaying,
  isRecording,
  discardRecording,
  isPaused,
  time,
  setTime,
  startTimer,
  stopTimer,
  interval,
  toggleRecordedAudio,
}: {
  isRecording: boolean;
  isPlaying: boolean;
  playAudio: () => void;
  pauseAudio: () => void;
  clearRecording: () => void;
  discardRecording: () => void;
  resumeRecording: () => void;
  toggleRecordedAudio: () => void;
  isPaused: boolean;
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
  startTimer: () => void;
  stopTimer: () => void;
  interval: MutableRefObject<NodeJS.Timeout | null>;
}) => {
  useEffect(() => {
    if (isRecording) {
      startTimer();
    } else if (interval.current) {
      stopTimer();
    }

    return () => {
      if (interval.current) {
        stopTimer();
      }
    };
  }, [isRecording]);

  const togglePlayPause = () => {
    toggleRecordedAudio();
  };

  const handleDelete = () => {
    discardRecording();
    setTime(0);
  };

  return (
    <div className="flex border items-center justify-between p-3 rounded bg-gray-100 w-80">
      {/* Delete Icon */}
      <button onClick={handleDelete} className="pr-2 cursor-pointer">
        <MdOutlineDeleteForever size={20} className="text-red-300" />
      </button>

      {/* Recording indicator (red dot) and time */}
      <div className="flex items-center">
        <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>

        <span className="text-sm">
          {new Date(time * 1000).toISOString().substr(14, 5)}
        </span>
      </div>

      {/* Audio visualization line */}
      <div className="flex-1 h-1 mx-2 bg-gray-600 rounded-full relative">
        <div
          className="absolute top-0 left-0 h-1 bg-white rounded-full animate-pulse"
          style={{ width: `${(time % 60) * 1.6}%` }}
        ></div>
      </div>

      {/* Play/Pause button */}
      <button onClick={togglePlayPause} className="focus:outline-none">
        {isPaused ? (
          !isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-400 hover:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.25v13.5L19.5 12 5.25 5.25z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-400 hover:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25v13.5m-7.5-13.5v13.5"
              />
            </svg>
          )
        ) : null}
      </button>
    </div>
  );
};

export default RecorderIndicator;

import { useState, useEffect, useCallback } from "react";
import { AudioRecorderService } from "@/repository/audio";

interface AudioRecorderHook {
  isRecording: boolean;
  audioData: Blob | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  toggleRecording: () => Promise<void>;
}

export const useAudioRecorder = (): AudioRecorderHook => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioData, setAudioData] = useState<Blob | null>(null);

  useEffect(() => {
    AudioRecorderService.setOnRecordingState(setIsRecording);
    AudioRecorderService.setOnAudioData(setAudioData);

    return () => {
      AudioRecorderService.setOnRecordingState(null);
      AudioRecorderService.setOnAudioData(null);
    };
  }, []);

  const startRecording = useCallback(async (): Promise<void> => {
    await AudioRecorderService.startRecording();
  }, []);

  const stopRecording = useCallback((): void => {
    AudioRecorderService.stopRecording();
  }, []);

  const toggleRecording = useCallback(async (): Promise<void> => {
    if (isRecording) {
      stopRecording();
    } else {
      await startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  return {
    isRecording,
    audioData,
    startRecording,
    stopRecording,
    toggleRecording,
  };
};

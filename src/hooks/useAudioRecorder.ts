import { useState, useEffect, useCallback } from "react";
import { AudioRecorderService } from "@/repository/audio";

interface AudioRecorderHook {
  isRecording: boolean;
  audioData: Blob | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  toggleOngoingRecording: () => Promise<void>;
  playAudio: () => void;
  pauseAudio: () => void;
  isPlaying: boolean;
  isPaused: boolean;
  clearRecording: () => void;
  discardRecording: () => void;
  resumeRecording: () => void;
  toggleRecordedAudio: () => void;
  transcribeAudio: () => void;
  isTranscribing: boolean;
}

export const useAudioRecorder = (): AudioRecorderHook => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [audioData, setAudioData] = useState<Blob | null>(null);

  useEffect(() => {
    const handleRecordingState = (state: boolean) => setIsRecording(state);
    const handlePlayingState = (state: boolean) => setIsPlaying(state);
    const handleAudioData = (audioBlob: Blob) => setAudioData(audioBlob);
    const handlePausedState = (state: boolean) => setIsPaused(state);
    const handleTranscribingState = (state: boolean) =>
      setIsTranscribing(state);

    AudioRecorderService.on("isRecording", handleRecordingState);
    AudioRecorderService.on("isPlaying", handlePlayingState);
    AudioRecorderService.on("audioData", handleAudioData);
    AudioRecorderService.on("isPaused", handlePausedState);
    AudioRecorderService.on("isTranscribing", handleTranscribingState);

    return () => {
      AudioRecorderService.off("isRecording", handleRecordingState);
      AudioRecorderService.off("isPlaying", handlePlayingState);
      AudioRecorderService.off("audioData", handleAudioData);
      AudioRecorderService.off("isPaused", handlePausedState);
      AudioRecorderService.off("isTranscribing", handleTranscribingState);
    };
  }, []);

  const startRecording = useCallback(async (): Promise<void> => {
    await AudioRecorderService.startRecording();
  }, []);

  const stopRecording = useCallback((): void => {
    AudioRecorderService.stopRecording();
  }, []);

  // const toggleRecording = useCallback(async (): Promise<void> => {
  //   if (isRecording) {
  //     stopRecording();
  //   } else {
  //     await startRecording();
  //   }
  // }, [isRecording, startRecording, stopRecording]);

  const playAudio = useCallback((): void => {
    AudioRecorderService.playRecordedAudio();
  }, []);

  const pauseAudio = useCallback((): void => {
    AudioRecorderService.pauseRecordedAudio();
    setIsPlaying(false);
  }, []);

  const clearRecording = useCallback((): void => {
    AudioRecorderService.clearAudioChunks();
    setAudioData(null);
  }, []);

  const discardRecording = useCallback((): void => {
    AudioRecorderService.discardRecording();
  }, []);

  const resumeRecording = useCallback((): void => {
    AudioRecorderService.resumeRecording();
  }, []);

  const toggleOngoingRecording = useCallback(async (): Promise<void> => {
    await AudioRecorderService.toggleOngoingRecording();
  }, []);

  const toggleRecordedAudio = useCallback((): void => {
    AudioRecorderService.toggleRecordedAudio();
  }, []);

  const transcribeAudio = useCallback((): void => {
    AudioRecorderService.transcribeAudio();
  }, []);

  return {
    isRecording,
    startRecording,
    stopRecording,
    toggleOngoingRecording,
    toggleRecordedAudio,
    clearRecording,
    discardRecording,
    resumeRecording,
    audioData,
    playAudio,
    pauseAudio,
    isPlaying,
    isPaused,
    transcribeAudio,
    isTranscribing,
  };
};

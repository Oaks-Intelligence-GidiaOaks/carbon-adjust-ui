// @ts-ignore
import { useState, useCallback, useEffect } from "react";
// import { useSpeechToText } from "@/hooks/useSpeechToText";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { useSpeechToText } from "./useSpeechToText";

interface ChatbotInputHook {
  inputText: string;
  isRecording: boolean;
  audioData: Blob | null;
  setInputText: (text: string) => void;
  handleSend: () => void;
  toggleOngoingRecording: () => Promise<void>;
  clearInput: () => void;
  pauseAudio: () => void;
  playAudio: () => void;
  isPlaying: boolean;
  isPaused: boolean;
  clearRecording: () => void;
  discardRecording: () => void;
  resumeRecording: () => void;
  toggleRecordedAudio: () => void;
  transcribeAudio: () => void;
  isTranscribing: boolean;

  isListening: boolean;
  transcript?: string;
  startListening: () => void;
  stopListening: () => void;
}

export const useChatbotInput = (): ChatbotInputHook => {
  const { isListening, transcript, startListening, stopListening } =
    useSpeechToText();

  const [inputText, setInputText] = useState<string>("");

  const {
    isRecording,
    isPlaying,
    audioData,
    toggleOngoingRecording,
    toggleRecordedAudio,
    pauseAudio,
    playAudio,
    clearRecording,
    discardRecording,
    isPaused,
    resumeRecording,
    transcribeAudio,
    isTranscribing,
  } = useAudioRecorder();

  const handleSend = useCallback((): void => {
    // Emit socket event here

    //
    console.log("Sending:", inputText);
    setInputText("");
    // clearTranscript();
  }, [
    inputText,
    // clearTranscript
  ]);

  const clearInput = useCallback(
    (): void => {
      setInputText("");
      // clearTranscript();
    },
    [
      // clearTranscript
    ]
  );

  useEffect(() => {
    setInputText(transcript);
  }, [transcript]);

  return {
    inputText,
    isRecording,
    audioData,
    setInputText,
    handleSend,
    toggleOngoingRecording,
    clearInput,
    clearRecording,
    isPlaying,
    pauseAudio,
    playAudio,
    discardRecording,
    isPaused,
    resumeRecording,
    toggleRecordedAudio,
    transcribeAudio,
    isTranscribing,

    isListening,
    startListening,
    stopListening,
  };
};

// @ts-ignore
import { useState, useCallback, useEffect } from "react";
// import { useSpeechToText } from "@/hooks/useSpeechToText";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";

interface ChatbotInputHook {
  inputText: string;
  isRecording: boolean;
  // isTranscribing: boolean;
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
}

export const useChatbotInput = (): ChatbotInputHook => {
  const [inputText, setInputText] = useState<string>("");

  // const {
  //   isListening: isTranscribing,
  //   transcript,
  //   startListening,
  //   stopListening,
  //   clearTranscript,
  // } = useSpeechToText();

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

  // const toggleRecording = useCallback(async (): Promise<void> => {
  //   console.log("toggle clicked...");
  //   if (
  //     isRecording

  //     // ||    isTranscribing
  //   ) {
  //     stopRecording();
  //     // stopListening();
  //   } else {
  //     setInputText("");
  //     // clearTranscript();
  //     await startRecording();
  //     // startListening();
  //   }
  // }, [
  //   isRecording,
  //   // isTranscribing,
  //   startRecording,
  //   stopRecording,
  //   // startListening,
  //   // stopListening,
  // ]);

  const clearInput = useCallback(
    (): void => {
      setInputText("");
      // clearTranscript();
    },
    [
      // clearTranscript
    ]
  );

  // Update inputText when transcript changes
  // useEffect(() => {
  //   setInputText(transcript);
  // }, [transcript]);

  return {
    inputText,
    isRecording,
    // isTranscribing,
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
  };
};

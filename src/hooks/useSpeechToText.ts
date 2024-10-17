import { SpeechToTextService } from "@/repository/speechToText";
import { useCallback, useEffect, useState } from "react";

interface SpeechToTextHook {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  toggleListening: () => void;
  clearTranscript: () => void;
}

export const useSpeechToText = (): SpeechToTextHook => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");

  useEffect(() => {
    SpeechToTextService.setOnTranscriptChange(setTranscript);
    SpeechToTextService.setOnListeningChange(setIsListening);

    return () => {
      SpeechToTextService.setOnTranscriptChange(null);
      SpeechToTextService.setOnListeningChange(null);
    };
  }, []);

  const startListening = useCallback((): void => {
    SpeechToTextService.startListening();
  }, []);

  const stopListening = useCallback((): void => {
    SpeechToTextService.stopListening();
  }, []);

  const toggleListening = useCallback((): void => {
    SpeechToTextService.toggleListening();
  }, []);

  const clearTranscript = useCallback((): void => {
    SpeechToTextService.clearTranscript();
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    toggleListening,
    clearTranscript,
  };
};

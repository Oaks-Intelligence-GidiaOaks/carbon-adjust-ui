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
    const handleTranscriptChange = (state: any) => setTranscript(state);
    const handleListeningChange = (state: boolean) => setIsListening(state);

    SpeechToTextService.on("transcriptChanged", handleTranscriptChange);
    SpeechToTextService.on("isListening", handleListeningChange);

    return () => {
      SpeechToTextService.off("transcriptChanged", handleTranscriptChange);
      SpeechToTextService.off("isListening", handleListeningChange);
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

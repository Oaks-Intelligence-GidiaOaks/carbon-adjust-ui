import { useState, useCallback, useEffect } from "react";
// import { useSpeechToText } from "@/hooks/useSpeechToText";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { useSpeechToText } from "./useSpeechToText";
import ChatSocketService from "@/repository/chatSocket";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { IMessage } from "@/interfaces/chatbot.interface";

interface ChatbotInputHook {
  inputText: string;
  isRecording: boolean;
  audioData: Blob | null;
  setInputText: (text: string) => void;
  handleSend: (msg: string) => void;
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

  messages: IMessage[];
}

export const useChatbotInput = (): ChatbotInputHook => {
  const { user } = useSelector((state: RootState) => state.user);
  const { isListening, transcript, startListening, stopListening } =
    useSpeechToText();

  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const handleMessagesChange = (state: IMessage[]) => setMessages([...state]);

    ChatSocketService.emitter.on("new_message", handleMessagesChange);

    return () => {
      ChatSocketService.emitter.off("new_message", handleMessagesChange);
    };
  }, []);

  useEffect(() => {
    setInputText(transcript);
  }, [transcript]);

  useEffect(() => {
    console.log(messages, "messages");
  }, [messages]);

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

  const handleSend = (msg: string): void => {
    ChatSocketService.sendMessage({
      conversation_id: "",
      query: msg,
      user_id: user?._id as string,
    });

    clearInput();
  };

  const clearInput = useCallback(
    (): void => {
      setInputText("");
      // clearTranscript();
    },
    [
      // clearTranscript
    ]
  );

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

    messages,
  };
};

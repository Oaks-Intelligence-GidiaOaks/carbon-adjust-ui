import { useChatbotInput } from "@/hooks/useChatBotInput";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";
import { StopCircle } from "lucide-react";
import { useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import RecorderIndicator from "../ui/RecorderIndicator";
// @ts-ignore
import { MdOutlineTranscribe } from "react-icons/md";
import useScrollIntoView from "@/hooks/useScrollIntoView";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

const ChatBot = () => {
  const [openChat, setOpenChat] = useState<boolean>(false);
  const ref = useRef<HTMLImageElement | null>(null);

  const [time, setTime] = useState(0);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const {
    inputText,
    isRecording,
    isPlaying,
    isTranscribing,
    startListening,
    stopListening,
    isListening,

    // transcribeAudio,
    setInputText,
    handleSend,
    toggleOngoingRecording,
    playAudio,
    pauseAudio,
    clearRecording,
    discardRecording,
    resumeRecording,
    toggleRecordedAudio,
    isPaused,

    messages,
    isSocketConnected,
    thinking,
  } = useChatbotInput();

  const startTimer = () => {
    if (!interval.current) {
      interval.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  };

  const ChatMessage = (props: {
    isLoggedInUser?: boolean;
    message?: string;
  }) => {
    return (
      <div
        className={`${
          props.isLoggedInUser ? "bg-[#EAF7FF] ml-auto" : "bg-[#EBEBEB]"
        } p-2 rounded-[12px] w-2/3 shadow flex-center gap-3`}
      >
        <img src="/assets/graphics/earth-01.svg" alt="" className=" w-6" />

        <p className="tracking-tighter text-[11px] font-[300] leading-tight text-[#212121]">
          {props?.message ||
            "What impact will artificial intelligence have on human work?"}
        </p>
      </div>
    );
  };

  const toggle = () => {
    setOpenChat(!openChat);
  };

  useOutsideCloser(ref, openChat, setOpenChat);
  useScrollIntoView(scrollRef, messages);

  const toggleRecording = () => {
    if (isRecording) {
      if (isPaused) {
        startTimer();
      } else {
        stopTimer();
      }
    }

    if (isListening) {
      stopListening();
    } else {
      startListening();
    }

    toggleOngoingRecording();
  };

  const sendChatMessage = () => {
    if (!isSocketConnected) {
      toast.error(`Something went wrong. try reloading the page.`);
    } else if (!inputText.length) {
      toast.error(`Please enter a message`);
    } else {
      handleSend(inputText);
    }
  };

  const handleTranscribe = () => {
    discardRecording();
    setTime(0);
  };

  return (
    <div
      ref={ref}
      className=" fixed bottom-4 right-3 z-[50] min-w-[280px] w-[400px]"
    >
      <div
        className={`${
          !openChat && "hidden"
        }  overflow-hidden ml-auto z-[50] font-[400] font-poppins md:text-sm text-xs max-w-[400px] min-w-[300px] w-full rounded-[12px] shadow-sm mx-auto`}
      >
        <h1 className="rounded-t-[12px] text-base tracking-tight blue-gradient text-white h-[60px] text-center font-[600] text-[20px] grid place-items-center">
          <span>Carbon-Adjust</span>
        </h1>

        <div className=" bg-[#F7F7F7] flex flex-col">
          <div className="flex flex-col gap-2 px-4 py-5 pb-6 border max-h-[290px] overflow-y-scroll scrollbar-hide">
            {Array.from(messages, (msg, i) => (
              <ChatMessage
                key={i}
                message={msg.text}
                isLoggedInUser={!msg.isAiMessage}
              />
            ))}

            {thinking && (
              <div>
                <ThreeDots
                  visible={true}
                  height="50"
                  width="50"
                  color="#c1c1c1"
                  radius="10"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}

            <div ref={scrollRef} className="h-1"></div>
          </div>

          <div className="flex-center gap-3 border-t w-full justify-between py-[16px] px-1">
            {isTranscribing ? (
              <div className="text-xs text-center flex-1">transcribing ...</div>
            ) : isRecording ? (
              <RecorderIndicator
                isPlaying={isPlaying}
                isRecording={isRecording}
                playAudio={playAudio}
                pauseAudio={pauseAudio}
                clearRecording={clearRecording}
                discardRecording={discardRecording}
                resumeRecording={resumeRecording}
                toggleRecordedAudio={toggleRecordedAudio}
                isPaused={isPaused}
                time={time}
                setTime={setTime}
                startTimer={startTimer}
                stopTimer={stopTimer}
                interval={interval}
              />
            ) : (
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                name="text"
                id="text"
                placeholder="Write your message...."
                className="flex-1 px-3 py-1  outline-none bg-transparent text-[#2E599A] placeholder-[#2E599A] text-xs tracking-tight font-poppins"
              />
            )}

            {true && (
              <button>
                {isRecording ? (
                  <StopCircle size={20} onClick={toggleRecording} />
                ) : inputText.length > 0 ? (
                  <IoSend
                    onClick={sendChatMessage}
                    className="flex-[0.1]"
                    color="#2E599A"
                    size={25}
                  />
                ) : (
                  <FaMicrophone
                    onClick={toggleRecording}
                    className="flex-[0.1]"
                    color="#2E599A"
                    size={25}
                  />
                )}
              </button>
            )}
          </div>

          {isRecording && (
            <div
              onClick={handleTranscribe}
              className="mb-3 mx-auto grid place-items-center w-fit h-fit p-3 cursor-pointer bg-gray-300 rounded-full only:"
            >
              <MdOutlineTranscribe size={20} color="blue" />
            </div>
          )}
        </div>
      </div>

      <img
        src="/assets/graphics/earth-01.svg"
        alt=""
        className=" w-10 mt-4 ml-auto animate-spin-slow"
        onClick={toggle}
      />
    </div>
  );
};

export default ChatBot;

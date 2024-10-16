import { useOutsideCloser } from "@/hooks/useOutsideCloser";
import { FormEvent, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";

const ChatBot = () => {
  const [openChat, setOpenChat] = useState<boolean>(false);
  const ref = useRef<HTMLImageElement | null>(null);

  const ChatMessage = (props: { isLoggedInUser?: boolean }) => {
    return (
      <div
        className={`${
          props.isLoggedInUser ? "bg-[#EAF7FF] ml-auto" : "bg-[#EBEBEB]"
        } p-2 rounded-[12px] w-2/3 shadow flex-center gap-3`}
      >
        <img src="/assets/graphics/earth-01.svg" alt="" className=" w-6" />

        <p className="tracking-tighter text-[11px] font-[300] leading-tight text-[#212121]">
          What impact will artificial intelligence have on human work?
        </p>
      </div>
    );
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    return;
  };

  const toggle = () => {
    setOpenChat(!openChat);
  };

  useOutsideCloser(ref, openChat, setOpenChat);

  return (
    <div ref={ref} className=" fixed bottom-4 right-3 z-[50] ">
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
            <ChatMessage />
            <ChatMessage isLoggedInUser />
            <ChatMessage />
            <ChatMessage isLoggedInUser />
            <ChatMessage />
            <ChatMessage isLoggedInUser />
            <ChatMessage />
            <ChatMessage isLoggedInUser />
          </div>

          <form
            onSubmit={onSubmit}
            className="flex-center gap-3 border-t w-full justify-between py-[16px] px-1"
          >
            <input
              type="text"
              name=""
              id=""
              placeholder="Write your message...."
              className="flex-1 px-3 py-1  outline-none bg-transparent text-[#2E599A] placeholder-[#2E599A] text-xs tracking-tight font-poppins"
            />

            <IoSend className="flex-[0.1]" color="#2E599A" size={25} />
          </form>
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

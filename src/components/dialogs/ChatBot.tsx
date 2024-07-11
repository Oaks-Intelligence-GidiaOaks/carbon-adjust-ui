import { IoSend } from "react-icons/io5";

const ChatBot = () => {
  const ChatMessage = (props: { isLoggedInUser?: boolean }) => {
    return (
      <div
        className={`${
          props.isLoggedInUser ? "bg-[#EAF7FF] ml-auto" : "bg-[#EBEBEB]"
        } p-2 rounded-[12px] w-2/3 shadow-md flex-center gap-3`}
      >
        <img src="/assets/graphics/earth-01.svg" alt="" className="" />

        <p>What impact will artificial intelligence have on human work?</p>
      </div>
    );
  };

  return (
    <div className="font-[400] font-poppins md:text-sm text-xs max-w-[500px] min-w-[300px] w-full rounded-[12px] border mx-auto">
      <h1 className="rounded-t-[12px] blue-gradient text-white h-[60px] text-center font-[600] text-[20px] grid place-items-center">
        <span>Carbon-Adjust</span>
      </h1>

      <div className="px-4 py-5 bg-[#F7F7F7] flex flex-col gap-4">
        <ChatMessage />
        <ChatMessage isLoggedInUser />
        <ChatMessage />

        <hr className="mt-6" />

        <div className="flex-center  w-full justify-between py-[20px]">
          <input
            type="text"
            name=""
            id=""
            placeholder="Write your message...."
            className="bg-transparent text-[#2E599A] placeholder-[#2E599A] text-lg font-poppins"
          />

          <IoSend color="#2E599A" size={25} />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

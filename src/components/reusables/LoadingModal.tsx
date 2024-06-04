import { ClipLoader } from "react-spinners";

const LoadingModal = ({ text }: { text: string }) => {
  return (
    <div className="fixed z-[1000000] top-0 left-0 w-full h-full bg-[#0000007f] flex flex-col gap-y-5 justify-center items-center backdrop-blur">
      <ClipLoader color="#ffffff" size={22} />
      <span className="text-lg text-white">{text}</span>
    </div>
  );
};

export default LoadingModal;

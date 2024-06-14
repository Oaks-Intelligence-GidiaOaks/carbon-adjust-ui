import { ClipLoader } from "react-spinners";

const Loading = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col gap-y-4 px-2 sm-px-6 items-center justify-center">
      <ClipLoader color="#2196F3" className="size-8 md:size-12" />
      <p className="font-poppins text-main ">{message}</p>
    </div>
  );
};

export default Loading;

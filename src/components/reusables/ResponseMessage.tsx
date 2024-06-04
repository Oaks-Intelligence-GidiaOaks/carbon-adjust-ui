import { IoCheckmarkDone } from "react-icons/io5";
import { BiErrorCircle } from "react-icons/bi";

const ResponseMessage = ({
  message,
  isError,
  isSuccess,
  noMargin,
}: {
  message: string;
  isError: boolean;
  isSuccess: boolean;
  noMargin: boolean;
}) => {
  return (
    <p
      className={`${isError ? "text-red-500" : null} ${
        isSuccess ? "text-green-500" : null
      } font-poppins flex items-start gap-x-2 ${noMargin ? "" : "my-10"} pt-6`}
    >
      {isSuccess && <IoCheckmarkDone size={18} />}
      {isError && <BiErrorCircle size={18} />}
      {(isSuccess || isError) && <span>{message}</span>}
    </p>
  );
};

export default ResponseMessage;

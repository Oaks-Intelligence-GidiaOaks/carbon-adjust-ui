import { MdClose } from "react-icons/md";
import { TfiHelpAlt } from "react-icons/tfi";

const CloseModal = (props: {
  cancelCheckout: () => void;
  removeModal: () => void;
}) => {
  return (
    <div className="rounded-2xl shrink absolute bg-white px-5 py-4 flex flex-col gap-4 items-center min-w-[240px] w-full max-w-[420px]">
      <div className="w-fit ml-auto" onClick={() => props.removeModal()}>
        <MdClose />
      </div>

      <div className="bg-[#111A24] h-[40px] w-[40px] grid place-items-center rounded-full">
        <TfiHelpAlt color="#FFFFFF" />
      </div>

      <p className="text-center">
        Are you sure you want to cancel this application?
      </p>

      <button
        onClick={() => props.cancelCheckout()}
        className="bg-[#E8503A] w-full rounded-lg  grid place-items-center h-[40px] text-white font-[700] text-base"
      >
        <span>Yes</span>
      </button>

      <button
        onClick={() => props.removeModal()}
        className="rounded-lg grid w-full place-items-center h-[40px] font-[700] text-base bg-[#E1E9F1] text-[#6C7E8E]"
      >
        <span>Cancel</span>
      </button>
    </div>
  );
};

export default CloseModal;

import { IoCloseOutline } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";

export const SubUserCard = (props: {
  name: string;
  email: string;
  image?: string;
}) => {
  return (
    <div className="flex items-start gap-2 border rounded-lg px-4 py-3 shadow-sm">
      {props?.image ? (
        <img src={props.image} alt="" className="h-6 w-6 rounded-full border" />
      ) : (
        <RxAvatar size={16} />
      )}

      <div className="flex flex-col">
        <h2 className="text-[#091E42] font-[400] text-xs">{props?.name}</h2>

        <h5 className="font-[400] text-[10px] text-[#3C3E41]">
          {props?.email}
        </h5>
      </div>

      <IoCloseOutline size={20} className="ml-auto" />
    </div>
  );
};

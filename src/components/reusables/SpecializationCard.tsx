import { LuLayoutDashboard } from "react-icons/lu";
import { IoEllipsisVertical } from "react-icons/io5";

type Props = { name: string };

const SpecializationCard = ({ name }: Props) => {
  return (
    <div className="shadow-lg p-4 rounded-md">
      <div className="flex justify-between">
        <span className="text-base text-black-main w-full max-w-[309px] min-w-[240px] font-semibold font-poppins flex-1 text-ellipsis line-clamp-1">
          {name}
        </span>
        <div className="p-2 rounded-lg flex justify-center items-center shadow">
          <LuLayoutDashboard className="text-blue-main" size={24} />
        </div>
      </div>
      <div className="mt-8">
        <div className="flex justify-between">
          <div className="font-poppins">
            <p className="text-sm font-poppins text-black-main">Attached to:</p>
            <p className="text-sm text-amber-500 font-poppins">
              1 Sub-contractor(s)
            </p>
          </div>
          <div
            role="button"
            className="flex cursor-pointer justify-center items-center hover:bg-gray-100 rounded-full size-8"
          >
            <IoEllipsisVertical className="text-black-main" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecializationCard;

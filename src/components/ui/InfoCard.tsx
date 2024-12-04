import { cn } from "@/lib/utils";
import React from "react";
import { IconType } from "react-icons";
import { FaAngleRight } from "react-icons/fa";

interface InfoCardProps {
  title: string;
  count: number | string;
  buttonText: string;
  icon: IconType;
  iconStyle: string;
  onButtonClick?: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  count,
  buttonText,
  iconStyle,
  icon: Icon,
  onButtonClick,
}) => {
  return (
    <div className=" w-[276px] flex gap-4 rounded-xl shadow-md p-4 bg-white border-[0.5px] font-poppins">
      <div className={cn("p-2 rounded-2xl h-fit", iconStyle)}>
        <Icon className="text-lg" />
      </div>

      <div className="flex flex-col gap-2">
        {/* Icon and Title */}
        <div className="flex items-center space-x-3 mb-2">
          <h4 className="text-gray-700 font-semibold">{title}</h4>
        </div>

        {/* Count */}
        <div className="text-2xl font-[400] text-gray-800 mb-4">{count}</div>

        {/* Button */}
        <button
          className="flex items-center px-4 py-2 text-white blue-gradient rounded-[24px] shadow hover:opacity-90 font-[400] text-[10px]"
          onClick={onButtonClick}
        >
          {buttonText} <FaAngleRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default InfoCard;

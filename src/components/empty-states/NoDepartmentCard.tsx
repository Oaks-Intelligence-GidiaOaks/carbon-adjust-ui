import { BoxCarton } from "@/assets/icons";
import React from "react";
import { FiPlus } from "react-icons/fi";

interface NoDepartmentCardProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
}

const NoDepartmentCard: React.FC<NoDepartmentCardProps> = ({
  title,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center space-x-3">
        <BoxCarton />
        <h2 className="text-base font-semibold">{title}</h2>
      </div>
      <button
        onClick={onButtonClick}
        className="flex items-center bg-[#2196F3] hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md text-xs"
      >
        {buttonText}
        <FiPlus className="ml-2 text-lg" />
      </button>
    </div>
  );
};

export default NoDepartmentCard;

import StaffCard from "@/components/ui/StaffCard";
import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ISubUnit } from "@/interfaces/organisation.interface";

const SubUnitCard: React.FC<ISubUnit> = ({
  climateScore = 0,
  name,
  staff,
  totalAssets = 0,
  totalStaff,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-4 bg-white shadow rounded-md border border-blue-50">
      {/* top section */}
      <div className="flex gap-2 flex-center">
        <input type="checkbox" name="" id="" className="w-4 h-4 mr-2" />

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Sub Unit name</p>
              <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            </div>

            <button className="text-gray-500 hover:text-gray-700">
              <FaEllipsisV />
            </button>
          </div>

          <hr className="my-2" />

          <div className="grid grid-cols-3 gap-4 mt-4 text-sm text-gray-700">
            <div>
              <p className="font-medium">No of staff</p>
              <p>{totalStaff}</p>
            </div>
            <div>
              <p className="font-medium">No. of Assets</p>
              <p>{totalAssets}</p>
            </div>
            <div>
              <p className="font-medium">Climate transition score</p>
              <p>{climateScore}</p>
            </div>
          </div>

          <hr className="my-5" />
        </div>
      </div>

      {/* Expand Section */}
      <div className="">
        <button
          className="flex items-center gap-2 text-sm text-blue-600 pb-5 text-center mx-auto"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Collapse" : "Expand"}
          {isExpanded ? <HiChevronUp /> : <HiChevronDown />}
        </button>

        {isExpanded && (
          <div className="space-y-4">
            {/* staff Cards */}
            <div className="space-y-4">
              <div className="flex-center justify-between">
                <h2 className="font-[600] text-[#4C5563] cursor-pointer ">
                  Staff Members
                </h2>

                <button className="flex-center gap-2 rounded-[16px] p-2 px-3 border-[1.2px] border-[#139EEC] text-[#139EEC]">
                  <AiOutlinePlusCircle />

                  <span className="text-xs font-[500] ">Add staff</span>
                </button>
              </div>

              <div className="grid place-items-center gap-3 grid-cols-3">
                {Array.from(staff, (stf, i) => (
                  <StaffCard
                    key={i}
                    {...stf}
                    onRemoveStaff={() => {}}
                    className="w-full"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubUnitCard;

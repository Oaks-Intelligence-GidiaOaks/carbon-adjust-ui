import StaffCard from "@/components/ui/StaffCard";
import { FC, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { DepartmentWithStaffCardProps } from "@/interfaces/organisation.interface";
import { IComponentMap } from "@/types/general";
import SubUnitCard from "./SubUnitCard";
import CreateSubUnitModal from "@/components/dialogs/CreateSubUnitModal";
import { useNavigate } from "react-router-dom";

enum UnitTabs {
  Staff = "Staff",
  SubUnit = "SubUnit",
}

const DepartmentWithStaffCard: FC<DepartmentWithStaffCardProps> = ({
  _id,
  name,
  totalAssets,
  climateScore,
  staff,
  subUnits,
  totalStaff,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<UnitTabs>(UnitTabs.Staff);
  const [showModal, setShowModal] = useState<boolean>(false);

  const navigate = useNavigate();

  // console.log(staff[0]);

  const StaffList = () => (
    <div className="space-y-4">
      <div className="flex-center justify-between">
        <h2
          className={
            "font-[600] text-[#4C5563] cursor-pointer border rounded-md p-2 bg-blue-50"
          }
          onClick={() => setActiveTab(UnitTabs.Staff)}
        >
          Staff Members
        </h2>

        <h2
          className="font-[600] text-[#4C5563] cursor-pointer mr-auto ml-5"
          onClick={() => setActiveTab(UnitTabs.SubUnit)}
        >
          Sub Unit
        </h2>

        <button
          onClick={() => navigate("/organisation/staff/new")}
          className="flex-center gap-2 rounded-[16px] p-2 px-3 border-[1.2px] border-[#139EEC] text-[#139EEC]"
        >
          <AiOutlinePlusCircle />

          <span className="text-xs font-[500] ">Add staff</span>
        </button>
      </div>

      <div className="grid place-items-center gap-3 grid-cols-3">
        {Array.from(staff, (stf, i) => (
          <StaffCard
            key={i}
            {...stf}
            unitId={_id}
            onRemoveStaff={() => {}}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );

  const SubUnitList = () => (
    <div className="space-y-4">
      <div className="flex-center justify-between">
        <h2
          className="font-[600] text-[#4C5563] cursor-pointer "
          onClick={() => setActiveTab(UnitTabs.Staff)}
        >
          Staff Members
        </h2>

        <h2
          className="font-[600] text-[#4C5563] cursor-pointer  mr-auto ml-5 border rounded-md p-2 bg-blue-50"
          onClick={() => setActiveTab(UnitTabs.SubUnit)}
        >
          Sub Units
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="flex-center gap-2 rounded-[16px] p-2 px-3 border-[1.2px] border-[#139EEC] text-[#139EEC]"
        >
          <AiOutlinePlusCircle />

          <span className="text-xs font-[500] ">Add SubUnit</span>
        </button>
      </div>

      <div className="grid  gap-y-3">
        {Array.from(subUnits, (sUnit, i) => (
          <SubUnitCard key={i} {...sUnit} />
        ))}
      </div>
    </div>
  );

  const getActiveTab: IComponentMap = {
    [UnitTabs.Staff]: <StaffList />,
    [UnitTabs.SubUnit]: <SubUnitList />,
  };

  return (
    <>
      <div className="p-4 bg-white shadow rounded-md border">
        {/* top section */}
        <div className="flex gap-2 flex-center">
          <input type="checkbox" name="" id="" className="w-4 h-4 mr-2" />

          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Unit name</p>
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

          {isExpanded && getActiveTab[activeTab]}
        </div>
      </div>

      {showModal && (
        <CreateSubUnitModal
          parentUnitId={_id}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
    </>
  );
};

export default DepartmentWithStaffCard;

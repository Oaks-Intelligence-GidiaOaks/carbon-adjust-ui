import {
  IAssignUnitAdmin,
  IUnitStaff,
} from "@/interfaces/organisation.interface";
import { formDateWithTime } from "@/lib/utils";
import { cn } from "@/utils";
import { FC, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import AssignStaffRoleModal from "../dialogs/AssignStaffRoleModal";

interface StaffCardProps extends IUnitStaff {
  onRemoveStaff: () => void;
  className?: string;
  parentUnitId: string;
}

const StaffCard: FC<StaffCardProps> = ({
  onRemoveStaff,
  className,
  createdAt,
  // isSubUnitAdmin,
  jobTitle,
  name,
  //isUnitAdmin,
  parentUnitId, 
  staffId,
  _id,
  profilePicture,
  //subUnit,
  //unit
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  // @ts-ignore
  // const handleAssignRole = () => {
  //   onAssignRole({
  //     staffId: (staffId || _id) as string,
  //     subUnitId: subUnit?._id,
  //   });
  // };

  return (
    <>
      <div
        className={cn(
          "p-6 w-[300px] shrink-0 px-6 border-[0.5px] bg-white shadow rounded-lg relative",
          className
        )}
      >
        {/* Dropdown Menu */}
        <div className="relative w-fit ml-auto">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setShowMenu(!showMenu)}
          >
            <FaEllipsisV />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-[2px] w-40 bg-white shadow-md rounded-md border text-sm">
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => setShowModal(true)}
              >
                Assign as admin
              </button>

              <button
                className="block w-full px-4 py-2 text-left text-red-500 hover:bg-red-100"
                onClick={()=>onRemoveStaff()}
              >
                Remove staff
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          {/* Profile Details */}
          <div className="flex items-center gap-4">
            {/* Profile Picture */}
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500">
              <img
                src={profilePicture}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name and Role */}
            <div className="">
              <h3 className="font-bold text-base text-gray-800">{name}</h3>
              <p className="text-xs font-[600] text-gray-600">{jobTitle}</p>
              <p className="text-xs tracking-tight text-gray-500">
                Joined {formDateWithTime(createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <AssignStaffRoleModal
          staffId={(staffId || _id) as string} 
          unit={parentUnitId}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export default StaffCard;

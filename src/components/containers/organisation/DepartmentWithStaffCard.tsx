import StaffCard from "@/components/ui/StaffCard";
import { FC, useEffect, useRef, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { DepartmentWithStaffCardProps } from "@/interfaces/organisation.interface";
import { IComponentMap } from "@/types/general";
import SubUnitCard from "./SubUnitCard";
import CreateSubUnitModal from "@/components/dialogs/CreateSubUnitModal";
import toast from "react-hot-toast";
import { deleteStaff } from "@/services/organisation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "@/components/dialogs/Modal";
import { Button } from "@/components/ui";
import { Oval } from "react-loader-spinner";
import AssetCard from "./AssetsCard";

enum UnitTabs {
  Staff = "Staff",
  SubUnit = "SubUnit",
  Assets = "Assets",
}

const DepartmentWithStaffCard: FC<DepartmentWithStaffCardProps> = ({
  _id,
  name,
  totalAssets,
  climateScore,
  staff,
  assets,
  subUnits,
  totalStaff,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<UnitTabs>(UnitTabs.Staff);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<any>(null);

 

  const queryClient = useQueryClient();

  const DeleteStaff = useMutation({
    mutationKey: ["delete-staff"],
    mutationFn: (staffId: string) => deleteStaff(staffId),
    onSuccess: (sx: any) => {
      toast.success(sx.message);
      setCurrentId(null);
      queryClient.invalidateQueries({ queryKey: ["get-admin-units"] });
    },
    onError: (ex: any) => {
      toast.error(ex.response.data.message);
    },
  });

  // const handleRemoveStaff = (staffId: string) => {
  //     DeleteStaff.mutate(staffId); // Trigger the delete mutation

  // };

  const StaffList = () => (
    <div className="space-y-4">
      <div className="flex-center justify-between">
        <div className="flex gap-1">
          <h2
            className="font-[600] text-[#4C5563] cursor-pointer "
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
          <h2
            className="font-[600] text-[#4C5563] cursor-pointer  mr-auto ml-5"
            onClick={() => setActiveTab(UnitTabs.Assets)}
          >
            Assets
          </h2>
        </div>

        <button className="flex-center gap-2 rounded-[16px] p-2 px-3 border-[1.2px] border-[#139EEC] text-[#139EEC]">
          <AiOutlinePlusCircle />

          <span className="text-xs font-[500] ">Add staff</span>
        </button>
      </div>

      <div className="grid place-items-center gap-3 grid-cols-1 lg:grid-cols-3">
        {staff?.map((stf, i) => (
          <StaffCard
            key={i}
            {...stf}
            parentUnitId={_id}
            onRemoveStaff={() => setCurrentId(stf._id!)}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );

  const SubUnitList = () => (
    <div className="space-y-4">
      <div className="flex-center justify-between">
        <div className="flex gap-1">
          <h2
            className="font-[600] text-[#4C5563] cursor-pointer "
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
          <h2
            className="font-[600] text-[#4C5563] cursor-pointer  mr-auto ml-5"
            onClick={() => setActiveTab(UnitTabs.Assets)}
          >
            Assets
          </h2>
        </div>

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

  const AssetsList = () => (
    <div className="space-y-4">
      <div className="flex-center justify-between">
        <div className="flex gap-1">
          <h2
            className="font-[600] text-[#4C5563] cursor-pointer "
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
          <h2
            className="font-[600] text-[#4C5563] cursor-pointer  mr-auto ml-5"
            onClick={() => setActiveTab(UnitTabs.Assets)}
          >
            Assets
          </h2>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex-center gap-2 rounded-[16px] p-2 px-3 border-[1.2px] border-[#139EEC] text-[#139EEC]"
        >
          <AiOutlinePlusCircle />

          <span className="text-xs font-[500] ">Add Device</span>
        </button>
      </div>

      <div className="grid  gap-y-3">
        {Array.from(assets, (asset, i) => (
          <AssetCard key={i} {...asset} />
        ))}
      </div>
    </div>
  );

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref?.current && !ref.current.contains(event?.target as Node)) {
        setCurrentId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, currentId]);

  const DeleteStaffModal = () => {
    return (
      <Modal>
        <div
          ref={ref}
          className="w-[95%] sm:w-1/2 max-w-[513px] min-w-[240px] flex flex-col gap-4 bg-white shadow-lg rounded-xl overflow-scroll p-6 py-8 lg:px-5"
        >
          <h2 className="text-center font-[600] text-base text-gray-800 pt-3">
            Deleting this Staff will remove all data related to this staff
          </h2>

          <h2 className="text-center">Are you sure you want to proceed?</h2>

          <div className="flex-center gap-3">
            <Button
              disabled={DeleteStaff.isPending}
              onClick={() => DeleteStaff.mutate(currentId)}
              isLoading={false}
              variant={"destructive"}
              className="grid place-items-center mt-4 flex-1"
            >
              {DeleteStaff.isPending ? (
                <Oval
                  visible={true}
                  height="20"
                  width="20"
                  color="#ffffff"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <span className="text-center ">Delete</span>
              )}
            </Button>

            <Button
              onClick={() => setCurrentId(null)}
              variant={"default"}
              className="grid place-items-center mt-4 flex-1"
            >
              <span className="text-center ">Cancel</span>
            </Button>
          </div>
        </div>
      </Modal>
    );
  };


  const getActiveTab: IComponentMap = {
    [UnitTabs.Staff]: <StaffList />,
    [UnitTabs.SubUnit]: <SubUnitList />,
    [UnitTabs.Assets]: <AssetsList />,
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

      {currentId && <DeleteStaffModal />}
    </>
  );
};

export default DepartmentWithStaffCard;

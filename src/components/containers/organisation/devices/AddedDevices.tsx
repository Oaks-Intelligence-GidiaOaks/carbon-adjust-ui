import { BiSearch } from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { PlusIcon } from "@/assets/icons";
import DeviceCard from "../../devices/DeviceCard";
import { IoIosArrowForward } from "react-icons/io";
import { useState, useRef } from "react";
import GroupDevicesModal from "./GroupDevicesModal";
import AssignStaffModal from "./AssignStaff";
import { MdMoreVert } from "react-icons/md";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";
import LinkToUnitModal from "./LinkToUnitModal";

const AddedDevices = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [cardActions, setCardActions] = useState<boolean>(false);
  const actionsRef = useRef<null | HTMLDivElement>(null);

  useOutsideCloser(actionsRef, cardActions, setCardActions);

  const devices: Device[] = [
    {
      _id: "1",
      key: 1,
      creator: "John Doe",
      energySource: "Solar",
      gasProvider: "GasCo",
      name: "Solar Panel A",
      electricityProvider: "Electricity Inc.",
      status: "Active",
      currentDispatchStatus: "Dispatching",
      currentDispatchTime: "2024-12-08T10:00:00Z",
      powerRating: 500,
      serialNos: "SP-001",
      type: "Solar Panel",
      voltageLevel: "240V",
      file: "https://via.placeholder.com/150",
    },
    {
      _id: "2",
      key: 2,
      creator: "Jane Smith",
      energySource: "Wind",
      gasProvider: undefined,
      name: "Wind Turbine B",
      electricityProvider: "GreenEnergy Ltd.",
      status: "Inactive",
      currentDispatchStatus: "Not Dispatching",
      currentDispatchTime: "2024-12-07T15:30:00Z",
      powerRating: 1200,
      serialNos: "WT-002",
      type: "Wind Turbine",
      voltageLevel: "480V",
      file: "https://via.placeholder.com/150",
    },
    {
      _id: "3",
      key: 3,
      creator: "Alice Brown",
      energySource: "Hydro",
      gasProvider: undefined,
      name: "Hydro Generator C",
      electricityProvider: "WaterPower Inc.",
      status: "Under Maintenance",
      currentDispatchStatus: "Paused",
      currentDispatchTime: "2024-12-06T08:00:00Z",
      powerRating: 3000,
      serialNos: "HG-003",
      type: "Hydro Generator",
      voltageLevel: "11kV",
      file: "https://via.placeholder.com/150",
    },
  ];

  const CardActions = () => (
    <div
      ref={actionsRef}
      className="absolute bg-white top-8 right-2 max-w-[150px] shadow-lg border space-y-2 rounded-[10px] px-2 py-3 z-10"
    >
      <div className="text-[#414141] w-full cursor-pointer bg-[#EFF4FF99] rounded-md font-[400] font-sans text-[11px] text-center py-1 px-3 ">
        <span>Link to Building</span>
      </div>
      <div
        onClick={() => setShowUnitModal(true)}
        className="text-[#414141] w-full cursor-pointer bg-[#EFF4FF99] rounded-md font-[400] font-sans text-[11px] text-center py-1 px-3 "
      >
        <span>Assign to Unit</span>
      </div>

      <button
        /// onClick={() => props.setId(props._id as string)}
        className={` text-[#E71D36] cursor-pointer bg-[#EFF4FF99] rounded-md font-[400] font-sans text-[11px] text-center py-1 px-3 `}
      >
        <span>Delete Group</span>
      </button>
    </div>
  );

  return (
    <>
      <div className="mt-5">
        <div className="flex justify-between flex-wrap mt-[15px] gap-5">
          <div className="flex items-center justify-center gap-5">
            <Button variant={"outline"} className="flex gap-2 ">
              <IoFilterSharp />
              <span className="md:block hidden">Filter by date</span>
            </Button>
            <div className="relative border border-border rounded-lg h-10 p-0 bg-white md:w-[350px] w-[250px]">
              <BiSearch
                className="absolute top-2 left-2.5 opacity-40"
                size={24}
              />
              <input
                name="search"
                placeholder="Search here..."
                className="h-full w-full pl-10 m-0 bg-transparent text-sm outline-none border-none"
                //   value={searchQuery}
                //   onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center">
            <Button
              onClick={() => setShowModal(true)}
              variant={"outline"}
              className="rounded-[20px] border-blue-600 hover:text-blue-600 flex-center gap-1 text-blue-600"
            >
              Group Devices
            </Button>

            <Link className="ml-5" to="/dashboard/transport/add">
              <Button className="rounded-[20px] flex-center gap-1 ">
                <span>Add Device</span>
                <PlusIcon />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex relative items-center justify-between p-3 max:w-[95%] mt-10">
          <div className="flex items-center gap-3">
            <h2 className="font-inter font-medium  lg:text-2xl text-[#667085]">
              Household Devices
            </h2>
            <span className="bg-[#F7FBFE] shadow-lg p-2">
              <IoIosArrowForward />
            </span>
          </div>
          <div>
            <MdMoreVert
              onClick={() => setCardActions(!cardActions)}
              className="cursor-pointer"
            />
            {cardActions && <CardActions />}
          </div>
        </div>
        <div className="mt-[15px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-5">
          {Array.from(devices as Device[], (it, i) => (
            <DeviceCard
              setShowStaffModal={setShowStaffModal}
              setCancelId={setCancelId}
              setId={setId}
              {...it}
              key={i}
            />
          ))}
        </div>
      </div>
      {showUnitModal && <LinkToUnitModal setShowModal={setShowUnitModal} />}
      {showModal && <GroupDevicesModal setShowModal={setShowModal} />}
      {showStaffModal && (
        <AssignStaffModal setShowStaffModal={setShowStaffModal} />
      )}
    </>
  );
};

export default AddedDevices;

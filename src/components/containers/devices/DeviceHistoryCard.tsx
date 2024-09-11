import ListTile from "@/components/reusables/device/ListTile";
import { IDispatchDevice } from "@/interfaces/device.interface";
import { roundNumber } from "@/lib/utils";
import { useState } from "react";
import { GoDotFill, GoDownload } from "react-icons/go";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const DeviceHistoryCard = (props: IDispatchDevice) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [deviceShown, setDeviceShown] = useState<boolean>(false);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const handleDownload = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div
      className="bg-white border-[0.5px] rounded-md shadow-sm flex-center p-3 lg:px-5 text-sm lg:text-base py-5 cursor-pointer "
      onClick={toggleChecked}
    >
      <input
        type="checkbox"
        name=""
        id=""
        checked={checked}
        onChange={toggleChecked}
      />

      <div className="flex flex-col pl-3 lg:pl-6 gap-4 flex-1">
        <div className="flex-center justify-between">
          <div className="space-y-3">
            <h4>{props?.device?.name}</h4>
            <h4 className="font-[500] text-light ">{props?.device?.type}</h4>
          </div>

          <div className="space-y-3">
            <h4>Status</h4>

            <button className="flex-center text-sm gap-1 bg-[#F2F2F2] rounded-[14px] py-[2px] px-2">
              <GoDotFill />
              <span>{props?.status}</span>
            </button>
          </div>
        </div>

        <hr className="" />

        <div className="grid grid-cols-2  lg:flex items-center  justify-between w-full gap-2 text-xs lg:text-sm">
          <div className="space-y-3 ">
            <h4 className="text-[#212121] font-[500]">Dispatch Time</h4>
            <h4 className="text-light">{props?.dispatchStartTime}GMT</h4>
          </div>

          <div className="space-y-3 ">
            <h4 className="text-[#212121] font-[500]">Dispatch Window</h4>
            <h4 className="text-light"> {props?.dispatchWindowInHours} hrs</h4>
          </div>

          <div className="space-y-3 ">
            <h4 className="text-[#212121] font-[500]">Projected Schedule</h4>
            <h4 className="text-light">
              {roundNumber(props?.estimatedCC ?? 0)} tCO2e
            </h4>
          </div>

          <div className="space-y-3 ">
            <h4 className="text-[#212121] font-[500]">
              Achieved Carbon-credit
            </h4>
            <h4 className="text-light">
              {roundNumber(props?.actualCC ?? 0)} tCO2e
            </h4>
          </div>
        </div>

        <hr className="" />

        {deviceShown && (
          <div className="p-3 flex items-stretch border-b pb-5 md:pl-24 h-[160px] ">
            <img
              src={props?.device?.file}
              alt=""
              className="w-[150px] h-full rounded-md"
            />

            <div className="flex flex-col gap-3 px-3 h-full ">
              <ListTile
                listing={props?.device?.powerRating || ""}
                name="Power rating"
              />

              <button
                onClick={handleDownload}
                className="mt-auto flex-center text-xs  gap-2 py-[6px] px-5 border rounded-3xl bg-gr text-primary-foreground hover:bg-primary/90 bg-gradient-to-l from-blue-main to-blue-secondary hover:bg-gradient-to-t hover:scale-[1.01] transition-all"
              >
                <GoDownload />
                <span>Download</span>
              </button>
            </div>

            <div className="flex flex-col gap-3 px-3">
              <ListTile
                listing={props?.device?.serialNos}
                name="Serial number"
              />
              <ListTile
                listing={`${props?.device?.voltageLevel || ""} V`}
                name="Voltage Level"
              />
            </div>
          </div>
        )}

        <div className="flex-center p-1">
          <p
            onClick={(e) => {
              e.stopPropagation();
              setDeviceShown(!deviceShown);
            }}
            className="flex-center gap-2 w-fit mx-auto cursor-pointer text-xs"
          >
            <span> {deviceShown ? "Collapse" : "Expand"} </span>

            {deviceShown ? (
              <MdOutlineKeyboardArrowUp />
            ) : (
              <MdOutlineKeyboardArrowDown />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeviceHistoryCard;

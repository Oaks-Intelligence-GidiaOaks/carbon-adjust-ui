import { useState } from "react";
import { GoDotFill } from "react-icons/go";

const DeviceHistoryCard = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const toggleChecked = () => {
    setChecked(!checked);
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
            <h4>Device name</h4>
            <h4 className="font-[500] text-light ">Washing Machine</h4>
          </div>

          <div className="space-y-3">
            <h4>Status</h4>

            <button className="flex-center text-sm gap-1 bg-[#F2F2F2] rounded-[14px] py-[2px] px-2">
              <GoDotFill />
              <span>Scheduled</span>
            </button>
          </div>
        </div>

        <hr className="" />

        <div className="grid grid-cols-2  lg:flex items-center  justify-between w-full gap-2 text-xs lg:text-sm">
          <div className="space-y-3 ">
            <h4 className="text-[#212121] font-[500]">Dispatch Time</h4>
            <h4 className="text-light">14:00GMT</h4>
          </div>

          <div className="space-y-3 ">
            <h4 className="text-[#212121] font-[500]">Dispatch Window</h4>
            <h4 className="text-light">6hrs : 35mins</h4>
          </div>

          <div className="space-y-3 ">
            <h4 className="text-[#212121] font-[500]">Projected Schedule</h4>
            <h4 className="text-light">789 tCO2e</h4>
          </div>

          <div className="space-y-3 ">
            <h4 className="text-[#212121] font-[500]">
              Achieved Carbon-credit
            </h4>
            <h4 className="text-light">789 tCO2e</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceHistoryCard;

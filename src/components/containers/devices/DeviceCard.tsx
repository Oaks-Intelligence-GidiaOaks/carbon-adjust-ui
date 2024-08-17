import { Button } from "@/components/ui";

import { IoAlertCircleSharp } from "react-icons/io5";
import { MdMoreVert } from "react-icons/md";

const DeviceCard = () => {
  const ListTile = (props: { name: string; listing: string }) => (
    <div className="space-y-[1]">
      <h5 className="text-[#767A85] text-xs  font-[400]">{props.name}</h5>
      <p className="font-[600] text-[#1F2026] text-[10px]">{props.listing}</p>
    </div>
  );

  // @ts-ignore
  const CardPopup = (props: { show?: boolean }) => {
    return (
      <div className="absolute top-8 right-2 border-[0.1px] px-3 border-[#BABABA] bg-white max-w-[200px] text-[#767A85] shadow-lg rounded-lg text-xs space-y-3 py-4">
        <div className="space-y-1">
          <h5>Dispatch window</h5>

          <select
            name=""
            id=""
            className="border rounded-md p-[6px] w-full outline-none"
          >
            {Array.from({ length: 3 }, (_, i) => (
              <option value="" key={i}>
                6 hours
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <h5>Start time</h5>

          <select
            name=""
            id=""
            className="border rounded-md p-[6px] w-full outline-none"
          >
            {Array.from({ length: 3 }, (_, i) => (
              <option value="" key={i}>
                00:00
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <h5>Device working period</h5>

          <select
            name=""
            id=""
            className="border rounded-md p-[6px] w-full outline-none"
          >
            {Array.from({ length: 3 }, (_, i) => (
              <option value="" key={i}>
                00:00
              </option>
            ))}
          </select>
        </div>

        <div className="flex-center gap-2">
          <Button
            variant="outline"
            className="h-[30px] grid place-items-center text-[10px] text-[#767A85]"
          >
            <span>Cancel</span>
          </Button>

          <Button className="h-[30px] grid place-items-center text-[10px] font-[400] text-white">
            <span>Confirm</span>
          </Button>
        </div>
      </div>
    );
  };

  const CardActions = () => (
    <div className="absolute bg-white top-8 right-2 max-w-[150px] shadow-lg border space-y-2 rounded-[10px] px-2 py-3">
      <div className="text-[#414141] cursor-pointer bg-[#EFF4FF99] rounded-md font-[400] font-sans text-[11px] text-center py-1 px-3 ">
        <span>Edit Device</span>
      </div>

      <div className="text-[#E71D36] cursor-pointer bg-[#EFF4FF99] rounded-md font-[400] font-sans text-[11px] text-center py-1 px-3 ">
        <span>Delete Device</span>
      </div>
    </div>
  );

  return (
    <div className="border-[0.4px] rounded-xl bg-white shadow-sm max-w-[392px]">
      <div className="flex-center justify-between px-[10px] border-b p-3 relative">
        <h2>Washing Machine</h2>
        <MdMoreVert />
        {/* <CardPopup show /> */}
        <CardActions />
      </div>

      <div className="flex items-start gap-4 border-b border-[0.4px] p-3 md:pl-[30px]">
        <img
          src="/assets/graphics/deviceImage.svg"
          alt=""
          className="w-[180px] h-auto "
        />

        <div className="flex flex-col gap-[10px] ">
          <ListTile name="Address" listing="Fulham rd." key={1} />
          <ListTile name="Serial number" listing="#32344543" key={2} />
          <ListTile name="Power rating" listing="B" key={3} />
          <ListTile name="Voltage level" listing="120 Volts" key={4} />
        </div>
      </div>

      <div
        className={`flex-center justify-between p-2 bg-[#DEE7F2] rounded-b-[10px]`}
      >
        <div className="flex-center gap-1 font-[500] text-xs font-sans">
          <IoAlertCircleSharp />
          <span>No dispatch scheduled</span>
        </div>

        <Button size="sm" className="!rounded-[20px] !px-4 !h-[27px]">
          <span className="text-xs font-sans">Schedule Dispatch</span>
        </Button>

        {/* <Button
          variant="outline"
          size="sm"
          className="!rounded-[20px] !px-4 !h-[27px] border-[#B70000] border bg-white"
        >
          <span className="text-xs font-sans font-[600] text-[#B70000]">
            Cancel Schedule
          </span>
        </Button> */}
      </div>
    </div>
  );
};

export default DeviceCard;

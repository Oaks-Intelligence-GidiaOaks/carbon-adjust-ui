import { BoxIcon } from "@/assets/icons";
import { Button } from "@/components/ui";

import { IoAlertCircleSharp } from "react-icons/io5";
import { MdMoreVert } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deviceChanged, timeChanged } from "@/features/assetSlice";
import { CurrentDispatchStatus, Device } from "@/interfaces/device.interface";
import { useRef, useState } from "react";
import {
  formDateWithTime,
  getRemainingHours,
  getStartTimes,
  getWorkingPeriodHours,
  // stripColonAndReturnNumber,
} from "@/lib/utils";
import { RootState } from "@/app/store";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";

const DeviceCard = (props: Device) => {
  const { device } = useSelector((state: RootState) => state.assets);

  const dispatch = useDispatch();

  const [cardActions, setCardActions] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);

  const actionsRef = useRef<null | HTMLDivElement>(null);

  useOutsideCloser(actionsRef, cardActions, setCardActions);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    dispatch(
      deviceChanged({
        [name]: value,
      })
    );
  };

  const ListTile = (props: { name: string; listing: string | number }) => (
    <div className="space-y-[1]">
      <h5 className="text-[#767A85] text-xs  font-[400]">{props.name}</h5>
      <p className="font-[600] text-[#1F2026] text-[10px]">{props.listing}</p>
    </div>
  );

  const CardPopup = () => {
    const timeInputRef = useRef<HTMLDivElement | null>(null);
    const [showTimeInput, setShowTimeInput] = useState<boolean>(false);

    useOutsideCloser(timeInputRef, showTimeInput, setShowTimeInput);

    let activeStyles = "bg-blue-main text-white";

    const isNoActive = (num: number, field: string) => {
      return (device.workingPeriod as any)[field] === num;
    };

    const changeTime = (val: number, field: string) => {
      let dData = {
        [field]: val,
      };

      dispatch(timeChanged(dData));
    };

    return (
      <div className="absolute top-8 right-2 border-[0.1px] px-3 border-[#BABABA] bg-white max-w-[200px] text-[#767A85] shadow-lg rounded-lg text-xs space-y-3 py-4">
        <div className="space-y-1">
          <h5>Dispatch window</h5>

          <select
            name="dispatchWindow"
            id=""
            className="border rounded-md p-[6px] w-full outline-none"
            onChange={handleInputChange}
            value={device.dispatchWindow}
          >
            {Array.from(getRemainingHours(), (item, i) => (
              <option value={item} key={i}>
                {item} hours
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <h5>Start time</h5>

          <select
            name="startTime"
            onChange={handleInputChange}
            value={device.startTime}
            id=""
            className="border rounded-md p-[6px] w-full outline-none"
          >
            <option>00:00</option>
            {Array.from(getStartTimes(device.dispatchWindow), (item, i) => (
              <option value={item} key={i}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <h5>Device working period (hrs)</h5>

          <div className="relative space-y-1">
            <div
              onClick={() => setShowTimeInput(!showTimeInput)}
              className="border p-2 rounded-md flex-center cursor-pointer"
            >
              <span className="px-1">
                {device.workingPeriod.hh < 10
                  ? `0${device.workingPeriod.hh}`
                  : device.workingPeriod.hh}
              </span>
              :
              <span className="px-1">
                {(device.workingPeriod.mm as number) < 10
                  ? `0${device.workingPeriod.mm}`
                  : device.workingPeriod.mm}
              </span>
            </div>

            {showTimeInput && (
              <div
                ref={timeInputRef}
                className="flex items-start border gap-1 p-1  rounded-md bg-white h-48 absolute w-[90%] mx-auto z-[50]"
              >
                <div className="flex flex-col flex-1 text-center gap-3 overflow-y-scroll scrollbar-hide">
                  {Array.from(
                    getWorkingPeriodHours(device.dispatchWindow),
                    (item, i) => (
                      <span
                        onClick={() => changeTime(item, "hh")}
                        className={`cursor-pointer p-2 rounded ${
                          isNoActive(item, "hh") && activeStyles
                        }`}
                        key={i}
                      >
                        {item}
                      </span>
                    )
                  )}
                </div>

                <div className="flex flex-col flex-1 text-center gap-3 overflow-y-scroll scrollbar-hide  h-full">
                  {Array.from({ length: 60 }, (_, i) => (
                    <span
                      onClick={() => changeTime(i, "mm")}
                      className={`cursor-pointer p-2 rounded ${
                        isNoActive(i, "mm") ? activeStyles : ""
                      }`}
                      key={i}
                    >
                      {i < 10 ? `0${i}` : i}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-center gap-2">
          <Button
            onClick={() => {
              setId(null);
            }}
            variant="outline"
            className="h-[30px] grid place-items-center text-[10px] text-[#767A85]"
          >
            <span>Cancel</span>
          </Button>

          <Button
            onClick={() => handleScheduleDispatch()}
            className="h-[30px] grid place-items-center text-[10px] font-[400] text-white"
          >
            <span>Confirm</span>
          </Button>
        </div>
      </div>
    );
  };

  const CardActions = () => (
    <div
      ref={actionsRef}
      className="absolute bg-white top-8 right-2 max-w-[150px] shadow-lg border space-y-2 rounded-[10px] px-2 py-3"
    >
      <div className="text-[#414141] cursor-pointer bg-[#EFF4FF99] rounded-md font-[400] font-sans text-[11px] text-center py-1 px-3 ">
        <span>Edit Device</span>
      </div>

      <div className="text-[#E71D36] cursor-pointer bg-[#EFF4FF99] rounded-md font-[400] font-sans text-[11px] text-center py-1 px-3 ">
        <span>Delete Device</span>
      </div>
    </div>
  );

  const handleScheduleDispatch = () => {
    dispatch(deviceChanged({ deviceId: props._id }));
    setId(null);
  };

  return (
    <div className="border-[0.4px] rounded-xl bg-white shadow-md max-w-[392px]">
      <div className="flex-center justify-between px-[10px] border-b p-3 relative">
        <h2 className="font-[600] text-sm font-inter pl-3">{props.name}</h2>
        <MdMoreVert onClick={() => setCardActions(!cardActions)} />
        {id && <CardPopup />}

        {cardActions && <CardActions />}
      </div>

      <div className="flex items-start gap-4 border-b border-[0.4px] p-3 md:pl-[30px]">
        <img
          src={props.file}
          alt=""
          className="w-[180px] h-[160px] rounded-md"
        />

        <div className="flex flex-col gap-[10px] ">
          {/* <ListTile name="Address" listing="Fulham rd." key={1} /> */}
          <ListTile name="Serial number" listing={props.serialNos} key={2} />
          <ListTile name="Power rating" listing={props.powerRating} key={3} />
          <ListTile name="Voltage level" listing={props.voltageLevel} key={4} />
        </div>
      </div>

      <div className="py-2 pl-5">
        <button className="text-[#139EEC] border-[#139EEC] border !rounded-[15.2px] px-4 py-1 flex-center gap-[7px] text-xs font-[400] font-sans">
          <span>Link Device</span>
          <BoxIcon className="h-5 w-5" />
        </button>
      </div>

      <div
        className={`flex-center justify-between p-3 px-6 bg-[#DEE7F2] rounded-b-[10px]`}
      >
        {!props.currentDispatchTime && Boolean(props.currentDispatchStatus) && (
          <div className="flex-center gap-1 font-[500] text-xs font-sans text-[#FF8D31]">
            <IoAlertCircleSharp />
            <span>Scheduled</span>
          </div>
        )}

        {Boolean(!props.currentDispatchStatus) && (
          <div className="flex-center gap-1 font-[500] text-xs font-sans text-[#FF8D31]">
            <IoAlertCircleSharp />
            <span>No dispatch scheduled</span>
          </div>
        )}

        {props.currentDispatchTime && (
          <div className="flex-center gap-1 font-[500] text-xs font-sans">
            <span className="bg-gradient-to-r from-[#139EEC] to-[#3465AF] bg-clip-text text-transparent text-xs font-[500]">
              Dispatch scheduled for{" "}
              {formDateWithTime(props.currentDispatchTime)}
            </span>
          </div>
        )}

        {!props.currentDispatchStatus && (
          <Button
            onClick={() => setId(props._id as string)}
            size="sm"
            className="!rounded-[20px] !px-4 !h-[27px]"
          >
            <span className="text-xs font-sans">Schedule Dispatch</span>
          </Button>
        )}

        {props.currentDispatchStatus === CurrentDispatchStatus.Scheduled && (
          <Button
            variant="outline"
            size="sm"
            className="!rounded-[20px] !px-4 !h-[27px] border-[#B70000] border bg-white"
          >
            <span className="text-xs font-sans font-[600] text-[#B70000]">
              Cancel Schedule
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default DeviceCard;

import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import Modal from "./Modal";
import { useOutsideCloser } from "@/hooks/useOutsideCloser";
import { IPowerLimit } from "@/interfaces/device.interface";
import { Oval } from "react-loader-spinner";

const TimeCapModal = (props: {
  showModal: any;
  powerLimits: Array<IPowerLimit>;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  updateLimits: (limits: Array<IPowerLimit>) => void;
  isPending: boolean;
}) => {
  const modalRef = useRef<null | HTMLDivElement>(null);
  useOutsideCloser(modalRef, props.showModal, props.setShowModal);

  const [limits, setLimits] = useState<Array<IPowerLimit>>(props.powerLimits);

  const inputChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    // @ts-ignore
    const { name, value } = e.target;

    setLimits((prev) =>
      prev.map((item, idx) =>
        idx === i ? { ...item, consumption_limit: Number(value) } : item
      )
    );
  };

  const handleSetLimit = () => {
    props.updateLimits(limits);
  };

  return (
    <Modal>
      <div
        ref={modalRef}
        className="bg-white rounded-[31.42px] px-[22.78px]  h-[357px] grid place-items-center w-[600px]"
      >
        <div className="flex flex-col gap-[40px]">
          <h2 className="font-[600] text-[#333333] text-[18.85px]">
            Set time cap
          </h2>

          <div className="bg-[#FAFAFA] p-2 py-3 flex items-stretch gap-6 w-full border ">
            <div className="space-y-6 text-[#139EEC] font-[500]">
              <h2 className="">Time</h2>

              <h2 className="mt-auto">Cap</h2>
            </div>

            <div className="flex-center gap-3 overflow-x-auto max-w-[470px] flex-1 format-scrollback">
              {Array.from(limits, (it, i) => (
                <div key={i} className="space-y-4">
                  <h2>{it.from_time}</h2>

                  <input
                    type="number"
                    name={it.from_time}
                    value={it.consumption_limit}
                    onChange={(e) => inputChange(e, i)}
                    className="border-[#A9A9A9] border-[0.79px] rounded-[3.93px] w-[65.97px] h-[30.63px] px-1"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            disabled={props.isPending}
            onClick={handleSetLimit}
            className={`rounded-[10.3px] p-1 font-[500] text-[17.13px] ml-auto  text-white w-[170.03px] grid place-items-center ${
              props.isPending ? "bg-gray-300" : "bg-[#4D94FE]"
            }`}
          >
            {props.isPending ? (
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
              <span> Set </span>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TimeCapModal;

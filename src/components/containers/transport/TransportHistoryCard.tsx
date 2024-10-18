import { FaAngleUp } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { Button } from "@/components/ui";
import { useState } from "react";

const TransportHistoryCard = () => {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <div className="flex flex-col bg-[#Fff] border rounded-lg py-5 px-10 divide-y ">
        <div className="flex justify-between items-center my-2">
          <div className="flex flex-col gap-y-2">
            <h3 className="text-sm font-normal text-gray-700">Plate Number</h3>
            <h4 className="text-sm font-semibold text-gray-600">FLM2024</h4>
          </div>

          <div className="flex flex-col gap-y-2">
            <h3 className="text-sm font-normal text-gray-700">Status</h3>
            <div className="text-green-800 bg-green-100 text-sm p-1 rounded-lg inline-flex items-center">
              <span>
                <LuDot />
              </span>
              completed
            </div>
          </div>
        </div>

        <div className="flex  sm:flex-row flex-col gap-5 py-5 justify-stretch items-start">
          <VehicleDetail
            title_1="Start location"
            des_1="Oshodi"
            title_2="Destination"
            des_2="Ikorodu"
          />
          <VehicleDetail
            title_1="Start time of travel window"
            des_1="3 Hours"
            title_2="Duration of travel window"
            des_2="12:00pm - 03:48pm"
          />
          <VehicleDetail
            title_1="Transport type"
            des_1="Private"
            title_2="Transport"
            des_2="Mustang (7vd2hg.."
          />
          <VehicleDetail
            title_1="Projected Carbon Offset"
            des_1="0.067tCO2"
            title_2="Actual Carbon Offset"
            des_2="789 tCO2e"
          />
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-5 my-5 py-2 sm:items-center items-start transition-all duration-500 ease-in-out overflow-hidden ${
            showMore ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <img
            src={"https://placehold.co/100x150"}
            alt=""
            className="sm:w-[100px] w-[100%] h-[150px] rounded-md object-cover"
          />
        </div>

        <div className="flex justify-center items-center p-3 ">
          <Button
            variant={"ghost"}
            className="gap-2"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? (
              <>
                <span>Collapse</span>
                <FaAngleUp />
              </>
            ) : (
              <>
                <span>Expand</span>
                <FaAngleUp />
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default TransportHistoryCard;

type VehicleDetailProps = {
  title_1: string;
  des_1: string;
  title_2?: string;
  des_2?: string;
};

const VehicleDetail = ({
  title_1,
  des_1,
  title_2,
  des_2,
}: VehicleDetailProps) => (
  <div className="w-full flex flex-row gap-5 capitalize sm:flex-wrap">
    <div className="flex w-1/2 sm:w-full  flex-col items-start justify-start gap-2.5">
      <div className="flex w-full items-start justify-stretch text-sm font-bold text-[#212121] ">
        <p>{title_1}</p>
      </div>
      <div className="text-sm font-normal text-gray-600">
        <p> {des_1}</p>
      </div>
    </div>
    <div className="flex w-1/2 sm:w-full  flex-col items-start justify-start gap-2.5">
      <div className="flex w-full items-start justify-stretch text-sm font-bold text-[#212121]  ">
        <p>{title_2}</p>
      </div>
      <div className="text-sm font-normal text-gray-600">
        <p> {des_2}</p>
      </div>
    </div>
  </div>
);

import { FaAngleUp } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { Button } from "@/components/ui";
import { useState } from "react";
import VehicleDetail from "./TransportDetail";
import { Trips } from "@/interfaces/transport.interface";
import { formatTimeToISO } from "@/lib/utils";

const TransportHistoryCard = (props: Trips) => {
  const {
    startLocation,
    destinationLocation,
    modeOfTransport,
    transportDetails,
    startTimeWindow,
    durationOfTravelWindow,
    plateNumber,
  } = props;

  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <div className="flex flex-col bg-[#Fff] border rounded-lg py-5 px-10 divide-y ">
        <div className="flex justify-between items-center my-2">
          <div className="flex flex-col gap-y-2">
            <h3 className="text-sm font-normal text-gray-700">Plate Number</h3>
            <h4 className="text-sm font-semibold text-gray-600">
              {plateNumber || "N/A"}
            </h4>
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 py-5">
          <VehicleDetail
            title="Start location"
            des={startLocation?.address || "N/A"}
          />
          <VehicleDetail
            title="Destination"
            des={destinationLocation?.address || "N/A"}
          />
          <VehicleDetail
            title="Start time of travel window"
            des={formatTimeToISO(startTimeWindow)}
          />
          <VehicleDetail
            title="Duration of travel window"
            des={durationOfTravelWindow}
          />
          <VehicleDetail title="Mode of transport" des={modeOfTransport} />
          <VehicleDetail title="Transport type" des={transportDetails} />
          <VehicleDetail title="Transport" des={"N/A"} />
          <VehicleDetail title="Projected Carbon Offset" des={"N/A"} />
          <VehicleDetail title="Actual Carbon Offset" des={"N/A"} />
          <VehicleDetail title="Actual emission" des={"N/A"} />
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-5 my-5  sm:items-center items-start transition-all duration-500 ease-in-out overflow-hidden ${
            showMore
              ? "max-h-[1000px] opacity-100 py-2 visible"
              : "max-h-0 opacity-0 invisible"
          }`}
          style={{ transitionProperty: "max-height, opacity" }}
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

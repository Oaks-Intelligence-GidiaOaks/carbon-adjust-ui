import { FaAngleUp } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { Button } from "@/components/ui";
import { useState } from "react";
import VehicleDetail from "./TransportDetail";
import { Trips } from "@/interfaces/transport.interface";
import { formatTimeToISO } from "@/lib/utils";
import Modal from "@/components/dialogs/Modal";
// import TransportMap from "./TransportMap";

const TransportHistoryCard = (props: Trips) => {
  const {
    startLocation,
    destinationLocation,
    modeOfTransport,
    transportDetails,
    startTimeWindow,
    durationOfTravelWindow,
    plateNumber,
    carName,
    tripQueueResponse,
    setIds,
    ids,
    _id,
  } = props;

  // const test = [
  //   {
  //     position: [-2.97784, 53.41078],
  //   },
  //   {
  //     position: [-3.09018, 53.24839],
  //   },
  //   {
  //     position: [-3.20252, 53.086],
  //   },
  //   {
  //     position: [-3.31486, 52.92361],
  //   },
  //   {
  //     position: [-3.4272, 52.76122],
  //   },
  //   {
  //     position: [-3.53954, 52.59883],
  //   },
  //   {
  //     position: [-3.65188, 52.43644],
  //   },
  //   {
  //     position: [-3.76422, 52.27405],
  //   },
  //   {
  //     position: [-3.87656, 52.11166],
  //   },
  //   {
  //     position: [-3.9889, 51.94927],
  //   },
  //   {
  //     position: [-4.10124, 51.78688],
  //   },
  //   {
  //     position: [-3.94337, 51.62158],
  //   },
  // ];

  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleChecked = (id: string) => {
    const idsArray = ids ? ids.split(",") : [];

    if (idsArray.includes(id)) {
      const updatedIds = idsArray.filter(
        (existingId: string) => existingId !== id
      );
      setIds(updatedIds.join(","));
    } else {
      idsArray.push(id);
      setIds(idsArray.join(","));
    }
  };

  const checked = ids.split(",").includes(_id);

  return (
    <>
      <div className="flex  bg-[#Fff] border rounded-lg py-5 px-5 sm:px-10 ">
        <div className="sm:flex hidden">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => toggleChecked(_id)}
            className="mr-4 cursor-pointer"
          />
        </div>
        <div className="flex-1 flex-col sm:p-5 divide-y-2">
          <div className="flex justify-between items-center my-2">
            <div className="flex items-center">
              <div className="sm:hidden block">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleChecked(_id)}
                  className="mr-4 cursor-pointer"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-normal text-gray-700">
                  Plate Number
                </h3>
                <h4 className="text-sm font-semibold text-gray-600">
                  {plateNumber || "N/A"}
                </h4>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-col gap-y-2">
                <h3 className="text-sm font-normal text-gray-700">Status</h3>
                <div
                  className={`${
                    tripQueueResponse?.status?.toLowerCase() === "completed"
                      ? "text-green-800 bg-green-100"
                      : "text-red-800 bg-red-100"
                  } text-sm px-3 rounded-lg inline-flex items-center`}
                >
                  <span>
                    <LuDot />
                  </span>
                  {tripQueueResponse?.status?.toLowerCase() ?? "pending"}
                </div>
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
            <VehicleDetail title="Transport" des={carName || "N/A"} />
            <VehicleDetail title="Projected Carbon Offset" des={"N/A"} />
            <VehicleDetail title="Actual Carbon Offset" des={"N/A"} />
            <VehicleDetail
              title="Actual emission"
              des={
                tripQueueResponse?.response?.best_route?.route_emission || "N/A"
              }
            />
            <VehicleDetail title="Scheduled Travel time" des={"N/A"} />
            <VehicleDetail
              title="Arrival time"
              des={
                tripQueueResponse?.response?.best_route
                  ?.estimated_arrival_time || "N/A"
              }
            />
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-5 my-5  sm:items-center items-start transition-all duration-500 ease-in-out overflow-hidden ${
              showMore
                ? "max-h-[1000px] opacity-100 py-2 visible"
                : "max-h-0 opacity-0 invisible"
            }`}
            style={{ transitionProperty: "max-height, opacity" }}
          >
            <Button
              onClick={() => setShowModal(true)}
              className="rounded-[20px] flex-center gap-1 mt-2 w-[150px] h-[30px]"
            >
              <span>View Route</span>
            </Button>
          </div>
          {tripQueueResponse?.response?.best_route?.route_coordinate && (
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
          )}
          {showModal && (
            <Modal>
              <div className="w-[90%] sm:w-[50%] bg-white h-[90%] rounded-lg p-5 overflow-y-scroll">
                <div className="sticky top-0 flex justify-end  p-5">
                  <button
                    className="text-gray-500 text-2xl"
                    onClick={() => setShowModal(false)}
                  >
                    ✕
                  </button>
                </div>
                <div className="flex  flex-col justify-start sm:p-5 p-2">
                  <h2 className="text-2xl font-medium text-[#495057] capitalize font-poppins">
                    optimized Route
                  </h2>
                  <div className="h-[600px] sm:my-10 my-5 ">
                    {/* <TransportMap positions={test} /> */}
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default TransportHistoryCard;

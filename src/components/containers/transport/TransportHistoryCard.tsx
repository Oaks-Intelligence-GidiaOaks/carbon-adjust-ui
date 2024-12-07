import { FaAngleUp } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { AiOutlineDownload } from "react-icons/ai";
import { Button } from "@/components/ui";
import { useState } from "react";
import VehicleDetail from "./TransportDetail";
import { Trips } from "@/interfaces/transport.interface";
import { formatDateTime, formatTimeToISO, generateKML } from "@/lib/utils";
import Modal from "@/components/dialogs/Modal";
import TransportMap from "./TransportMap";
import { saveAs } from "file-saver";

const TransportHistoryCard = (props: Trips) => {
  const {
    startLocation,
    destinationLocation,
    modeOfTransport,
    transportDetails,
    startTimeWindow,
    latestArrivalTime,
    durationOfTravelWindow,
    plateNumber,
    carName,
    tripQueueResponse,
  } = props;

  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);


  function downloadKML(data: any[]) {
    const kmlContent = generateKML(data);

    const blob = new Blob([kmlContent], {
      type: "application/vnd.google-earth.kml+xml",
    });
    saveAs(blob, "optimized-coordinates.kml");
  }

  const getStatusClasses = (status: string) => {
    const statusLowerCase = status?.toLowerCase();

    switch (statusLowerCase) {
      case "completed":
        return "text-green-800 bg-green-100";
      case "pending":
        return "text-yellow-800 bg-yellow-100";
      default:
        return "text-red-800 bg-red-100";
    }
  };

  return (
    <>
      <div className="flex  bg-[#Fff] border rounded-lg py-5 px-5 sm:px-10 ">
        <div className="flex-1 flex-col sm:p-5 divide-y-2">
          <div className="flex justify-between items-center my-2">
            <div className="flex items-center">
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
              <h3 className="text-sm font-normal text-gray-700">Status</h3>
              <div
                className={`${getStatusClasses(
                  tripQueueResponse?.status || "pending"
                )}
                  } text-sm px-2  rounded-sm inline-flex items-center capitalize`}
              >
                <span>
                  <LuDot />
                </span>
                {tripQueueResponse?.status?.toLowerCase() ?? "pending"}
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
            {startTimeWindow ? (
              <VehicleDetail
                title="Start time of travel window"
                des={formatTimeToISO(startTimeWindow)}
              />
            ) : (
              <VehicleDetail
                title="Latest arrival time"
                des={formatTimeToISO(latestArrivalTime)}
              />
            )}
            <VehicleDetail
              title="Duration of travel window"
              des={durationOfTravelWindow}
            />
            <VehicleDetail title="Mode of transport" des={modeOfTransport} />
            <VehicleDetail title="Transport type" des={transportDetails} />
            <VehicleDetail title="Transport" des={carName || "N/A"} />
            <VehicleDetail
              title="Projected Carbon Offset"
              des={tripQueueResponse?.response?.projected_arbitrage || "N/A"}
            />
            <VehicleDetail title="Actual Carbon Offset" des={"N/A"} />
            <VehicleDetail
              title="Actual emission"
              des={tripQueueResponse?.response?.min_emission || "N/A"}
            />
            <VehicleDetail
              title="Scheduled Travel time"
              des={
                tripQueueResponse?.response?.best_time
                  ? formatDateTime(tripQueueResponse?.response?.best_time)
                  : "N/A"
              }
            />
            <VehicleDetail
              title="Arrival time"
              des={
                tripQueueResponse?.response?.estimated_arrival_time
                  ? formatDateTime(
                      tripQueueResponse?.response?.estimated_arrival_time
                    )
                  : "N/A"
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
              onClick={() =>
                tripQueueResponse?.response?.best_route?.route_coordinate &&
                downloadKML(
                  tripQueueResponse?.response?.best_route?.route_coordinate
                )
              }
              className="rounded-[20px] flex-center gap-1 mt-2 w-[150px] h-[30px]"
            >
              <span>Download Route</span>
              <AiOutlineDownload />
            </Button>
            <Button
              onClick={() => {
                setShowModal(true);
              }}
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
                    {tripQueueResponse?.response?.best_route
                      ?.route_coordinate && (
                      <TransportMap
                        positions={
                          tripQueueResponse?.response?.best_route
                            ?.route_coordinate
                        }
                      />
                    )}
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

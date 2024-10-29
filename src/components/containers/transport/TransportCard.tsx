import { MdMoreVert } from "react-icons/md";
import { FaAngleUp } from "react-icons/fa";
import { Button } from "@/components/ui";
import { useState } from "react";
import { Transport } from "@/interfaces/transport.interface";
import VehicleDetail from "./TransportDetail";

const TransportCard = (props: Transport) => {
  const {
    _id,
    transportPhoto,
    yearOfPurchase,
    vehicleManufacturer,
    carModel,
    fuelType,
    address,
    city,
    emissionFactor,
    licensePlateNumber,
  } = props;

  const [showMore, setShowMore] = useState(false);

 
  return (
    <>
      <div className="flex flex-col bg-[#Fff] border rounded-lg py-5 sm:px-10 px-5 divide-y-2 ">
        <div className="flex justify-between items-center pb-3">
          <div className="flex gap-x-4">
            <div className="flex flex-col gap-y-2">
              <h3 className="text-sm font-normal text-gray-700">
                Plate Number
              </h3>
              <h4 className="text-sm font-semibold text-gray-600">
                {licensePlateNumber}
              </h4>
            </div>
          </div>
          <MdMoreVert />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 py-5">
          <VehicleDetail title="ID" des={_id} />
          <VehicleDetail title="Vehicle " des={vehicleManufacturer} />
          <VehicleDetail title="Year of purchase" des={yearOfPurchase} />
          <VehicleDetail title="Car Model" des={carModel} />
          <VehicleDetail title="fuel type" des={fuelType} />
        </div>
        <div
          className={`flex flex-col sm:flex-row gap-5  items-start transition-all duration-500 ease-in-out overflow-hidden ${
            showMore
              ? "max-h-[1000px] opacity-100 visible py-5"
              : "max-h-0 opacity-0 invisible"
          }`}
          style={{ transitionProperty: "max-height, opacity" }}
        >
          <img
            src={transportPhoto}
            alt=""
            className="sm:w-[320px] w-[100%] h-[250px] rounded-md object-cover"
          />

          <div className="flex w-[250px] flex-col gap-[10px]">
            <div className="flex  justify-between gap-5">
              <VehicleDetail title="address" des={address} />
              <VehicleDetail title="city" des={city} />
            </div>
            <VehicleDetail title="emission factor" des={emissionFactor} />

          </div>
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

export default TransportCard;

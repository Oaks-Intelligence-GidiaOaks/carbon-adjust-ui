import { MdMoreVert } from "react-icons/md";
import { FaAngleUp } from "react-icons/fa";
import { AiOutlineDownload } from "react-icons/ai";
import { Button } from "@/components/ui";
import { useState } from "react";
import { Transport } from "@/interfaces/transport.interface";

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
  } = props;

  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <div className="flex flex-col bg-[#Fff] border rounded-lg py-5 px-10 divide-y ">
        <div className="flex justify-between items-center ">
          <div className="flex gap-x-4">
            <div className="flex flex-col gap-y-2">
              <h3 className="text-sm font-normal text-gray-700">
                Plate Number
              </h3>
              <h4 className="text-sm font-semibold text-gray-600">FLM2024</h4>
            </div>
          </div>
          <MdMoreVert />
        </div>

        <div className="flex  sm:flex-row flex-col gap-5 py-5 justify-stretch items-start">
          <VehicleDetail
            title_1="ID"
            des_1={_id}
            title_2="Vehicle manufacturer"
            des_2={vehicleManufacturer}
          />
          <VehicleDetail
            title_1="Year of purchase"
            des_1={yearOfPurchase}
            title_2="Car Model"
            des_2={carModel}
          />
          <VehicleDetail title_1="fuel type" des_1={fuelType} />
        </div>
        <div
          className={`flex flex-col sm:flex-row gap-5 my-5 py-2 sm:items-center items-start transition-all duration-500 ease-in-out overflow-hidden ${
            showMore ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <img
            src={transportPhoto}
            alt=""
            className="sm:w-[320px] w-[100%] h-[250px] rounded-md object-cover"
          />

          <div className="flex w-[300px] flex-col gap-[10px] ">
            <VehicleDetail
              title_1="address"
              des_1={address}
              title_2="city"
              des_2={city}
            />
            <VehicleDetail title_1="emission factor" des_1={emissionFactor} />

            <Button className="rounded-[20px] flex-center gap-1 mt-2 w-[150px] h-[30px]">
              <AiOutlineDownload />
              <span>Download</span>
            </Button>
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
  <div className="w-full flex flex-row gap-5 capitalize ">
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

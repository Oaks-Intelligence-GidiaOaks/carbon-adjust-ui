import { VehicleDetailProps } from "@/interfaces/transport.interface";

const VehicleDetail = ({ title, des }: VehicleDetailProps) => (
  <div>
    <p className="capitalize text-sm font-bold text-[#212121] ">{title}</p>
    <p className="break-all text-sm font-normal text-gray-600"> {des}</p>
  </div>
);

export default VehicleDetail;

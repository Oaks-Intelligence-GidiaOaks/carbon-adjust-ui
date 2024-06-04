import { GrLocation } from "react-icons/gr";
import { Button } from "./Button";

const Card = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="bg-[#F0F9FD] w-full sm:min-w-[320px] flex flex-col gap-2 py-4 px-4 rounded-md shadow-md font-poppins">
      <h1 className="text-[15px] leading-[24px] font-medium ">{title}</h1>

      <div className="flex items-center gap-2 text-main">
        <GrLocation size={20} />
        <span>{subtitle}</span>
      </div>

      <hr className="my-4" />

      <div className="flex items-center justify-between">
        <span className="text-[#2196F3] flex gap-2 text-[15px] leading-[24px] font-medium">
          Approval Rate:
          <span className="text-[#575757] text-[15px] leading-[24px] font-normal">
            90%
          </span>
        </span>

        <Button className="bg-[#2196F3] py-0 h-8 rounded-md px-6 text-[12px] leading-[18px] font-medium text-[#F8F9FA]">
          Apply
        </Button>
      </div>
    </div>
  );
};

export default Card;

import { cn } from "@/utils";
import CheckBox from "../ui/CheckBox";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  status: string;
};

const HIAApplicationStatus = ({ status }: Props) => {
  return (
    <div className="max-w-[397px] w-full bg-grey-swatch-500 h-[2px] rounded relative">
      <div
        className={cn(
          "absolute h-full bg-green-500 top-0 left-0",
          status === "APPLIED" && "w-0",
          status === "APPLIED" && "w-1/2",
          status === "DECLINED" && "w-1/2",
          status === "APPROVED" && "w-full"
        )}
      ></div>
      {/* for declined */}
      <div
        className={cn(
          "absolute h-full bg-red-500 top-0 right-0",
          status === "DECLINED" && "w-1/2"
        )}
      ></div>

      <div className="absolute -top-[7px] w-full h-full left-0 flex justify-between">
        <div className="relative">
          <p className="absolute -top-5 left-0 text-xs font-poppins">Applied</p>
          <CheckBox
            checked={["APPLIED", "APPROVED", "DECLINED"].includes(status)}
            className={cn(
              "border-2 border-grey-swatch-500 rounded-full",
              ["APPLIED", "APPROVED", "DECLINED"].includes(status) &&
                "bg-green-500 border-green-500"
              // ["DECLINED"].includes(status) && "bg-red-500 border-red-500"
            )}
            iconStyle="text-white"
          />
        </div>
        <div className="relative">
          <p className="absolute -top-5 text-xs font-poppins whitespace-nowrap -translate-x-[calc(50%-16px)]">
            Under review
          </p>
          <CheckBox
            checked={["APPLIED", "APPROVED", "DECLINED"].includes(status)}
            className={cn(
              "border-2 border-grey-swatch-500 rounded-full",
              ["APPLIED", "APPROVED", "DECLINED"].includes(status) &&
                "bg-green-500 border-green-500"
              // ["DECLINED"].includes(status) && "bg-red-500 border-red-500"
            )}
            iconStyle="text-white"
          />
        </div>
        <div className="relative">
          <p className="absolute -top-5 right-0 text-xs font-poppins">
            {status === "APPROVED" ? "Approved" : "Declined"}
          </p>
          <CheckBox
            checked={["APPROVED", "DECLINED"].includes(status)}
            className={cn(
              "border-2 border-grey-swatch-500 rounded-full",
              ["APPROVED", "approved/accepted"].includes(status) &&
                "bg-green-500 border-green-500",
              ["DECLINED"].includes(status) && "bg-red-500 border-red-500"
            )}
            checkIcon={
              status === "DECLINED" && (
                <XMarkIcon width={14} className={cn("text-white")} />
              )
            }
            iconStyle="text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default HIAApplicationStatus;

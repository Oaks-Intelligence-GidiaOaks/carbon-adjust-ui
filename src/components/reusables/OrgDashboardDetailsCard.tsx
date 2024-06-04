import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/utils";

type Props = {
  title: string;
  icon: ReactNode;
  value: string | number;
  viewAllUrl: string;
  percentageValue?: number;
};

const OrgDashboardDetailsCard = ({
  title,
  icon,
  value,
  viewAllUrl,
  percentageValue = 0,
}: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 font-poppins">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-main">{title}</p>
        <p>{icon}</p>
      </div>
      <div className="flex justify-center mt-4">
        <p className="font-semibold text-2xl text-main">{value}</p>
      </div>
      <div className="flex justify-center mt-2">
        <Link to={viewAllUrl} className="flex">
          <Button className="text-xs h-[30px] w-[87px] rounded-full flex gap-x-1">
            View All
            <span>
              <ChevronRightIcon className="size-3 text-white" />
            </span>
          </Button>
        </Link>
      </div>
      <p
        className={cn(
          !percentageValue && "opacity-0",
          "mt-4 text-xs text-main text-center"
        )}
      >
        <span
          className={cn(
            !percentageValue && "opacity-0",
            Boolean(percentageValue) && percentageValue < 0
              ? "text-red-500"
              : "text-green-500"
          )}
        >
          {percentageValue}%
        </span>{" "}
        up from last month
      </p>
    </div>
  );
};

export default OrgDashboardDetailsCard;

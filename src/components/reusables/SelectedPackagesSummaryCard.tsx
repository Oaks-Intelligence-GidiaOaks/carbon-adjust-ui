import { FaChevronDown } from "react-icons/fa";
import { Button } from "../ui";
import PackageCard from "./PackageCard";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/utils";
import SubContractorCard from "./SubContractorCard";

type Props = {
  packageData: {
    org_name: string;
    location: string;
    rating: string;
    subcontractors: string;
    services: string[];
    created_at: string;
    homes_retrofitted: string;
    users: string[];
    logo: string;
  };
  subContractorData: {
    org_name: string;
    location: string;
    rating: string;
    services: string[];
    created_at: string;
    homes_retrofitted: string;
    logo: string;
  }[];
  setShowSheet: Dispatch<SetStateAction<boolean>>;
  setShowSelectedPackagesSheet: Dispatch<SetStateAction<boolean>>;
};

const SelectedPackagesSummaryCard = ({
  packageData,
  subContractorData,
  setShowSelectedPackagesSheet,
  setShowSheet,
}: Props) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div>
      <PackageCard
        data={packageData}
        setShowSheet={setShowSheet}
        closeOtherSheets={() => {
          setShowSelectedPackagesSheet(false);
        }}
        className="rounded-none rounded-t-2xl"
        type="hia"
      />
      <Button
        onClick={() => setShowMore(!showMore)}
        variant={"secondary"}
        className={cn(
          "w-full bg-[#F2F2F2] hover:bg-[#191919]/20 rounded-b-2xl rounded-t-none border-t border-white font-poppins flex items-center gap-x-2 text-black-main",
          showMore && "rounded-none"
        )}
      >
        <span>See {showMore ? "less" : "more"}</span>
        <FaChevronDown
          className={cn("transition-all", showMore && "rotate-180")}
        />
      </Button>
      {Boolean(showMore && subContractorData.length) && (
        <div className="flex flex-col h-fit w-full bg-red-500">
          {subContractorData.map((subcontractor, i) => (
            <SubContractorCard
              data={subcontractor}
              key={i}
              setShowSheet={setShowSheet}
              isNested={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedPackagesSummaryCard;

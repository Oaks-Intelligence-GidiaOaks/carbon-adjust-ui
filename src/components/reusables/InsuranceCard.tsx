import { StarIcon } from "@heroicons/react/20/solid";
import { Button } from "../ui";
import { Dispatch, SetStateAction, useState } from "react";
import CheckBox from "../ui/CheckBox";
import { formatNumberWithCommas } from "@/utils";

export type InsuranceCardProps = {
  data: {
    // _id: string;
    // name: string;
    // org_name: string;
    // location: string;
    // rating: string;
    // package_name: string;
    // created_at: string;
    // repayment_date: string;
    // logo: string;
    // loan_amount?: string;
    // currency?: string;
    // insurancePercent?: number;
    // maxInsuranceAmount: number;
    // createdBy: {
    //   name: string;
    // };
    _id: string;
    name: string;
    org_name: string;
    location: string;
    rating: string;
    package_name: string;
    created_at: string;
    repayment_date: string;
    logo: string;
    loan_amount?: string;
    currency?: string;
    insurancePercent?: number;
    maxInsuranceAmount: number;
    createdBy: {
      name: string;
      id: string;
    };
  };
  setShowSheet?: Dispatch<SetStateAction<boolean>>;
  setSelectedPackage?: Dispatch<SetStateAction<string | null>>;
  hideCheckBox?: boolean;
  isLive?: boolean;
  isNested?: boolean;
  selectedPackage?: string | null;
};

const InsuranceCard = ({
  data,
  hideCheckBox,
  isLive = false,
  selectedPackage = null,
  setSelectedPackage,
}: InsuranceCardProps) => {
  const [isChecked, setIsChecked] = useState(false);
  console.log(data);

  return isLive ? (
    <div className="w-full group flex gap-x-4 hover:shadow-lg transition-all min-w-[240px] h-[180px] max-w-[560px] overflow-hidden bg-[#DEDEDE]/30 border border-black-main/50 relative rounded-2xl pt-4 pb-4 px-2 sm:px-6 bg-no-repeat bg-right-top">
      <div className="size-8 sm:size-12 rounded-full overflow-hidden">
        <img
          src={(data as any).coverImg}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex flex-1 justify-between  items-center gap-x-2">
          <div className="flex justify-between flex-1 items-center">
            <p className="font-poppins text-black text-main text-base sm:text-lg text-ellipsis overflow-hidden line-clamp-1">
              {(data as any).name}
            </p>
            {!hideCheckBox && (
              <CheckBox
                checked={data._id === selectedPackage}
                className="border-2 border-green-500 rounded-full hover:bg-green-100"
                setIsChecked={() =>
                  setSelectedPackage && setSelectedPackage(data._id)
                }
              />
            )}
          </div>
        </div>
        <div className="flex items-center gap-x-3 mt-1">
          <div className="flex gap-2 flex-wrap items-center">
            <p className="bg-[#FFE5D3] text-[10px] py-1 px-2 font-poppins rounded">
              {/* {(data as any).coverImg} */}
            </p>
            <div className="flex gap-x-1 items-center">
              <span className="text-xs font-poppins font-bold">
                {data.rating ?? 0}
              </span>
              <StarIcon
                fontSize={12}
                className="text-amber-400 text-xs size-3"
              />
            </div>
          </div>
        </div>
        <div className="mt-1 text-sm sm:text-base text-ellipsis overflow-hidden line-clamp-1 text-grey-swatch-800 font-poppins">
          <p>{data.createdBy.name}</p>
          <p className="mt-1 text-lg font-medium">{data.loan_amount}</p>
        </div>
        <div className="my-4">
          <p className="font-semibold text-main text-2xl">
            {data.currency}
            {formatNumberWithCommas(data.maxInsuranceAmount)}
          </p>
        </div>

        <div className="mt-2 flex flex-col justify-between items-start">
          <p className="text-green-500 text-xs font-poppins">
            Insurance Percentage: {data.insurancePercent}%
          </p>
          {/* <Button
            variant={"link"}
            className="font-poppins font-light underline bg-transparent text-xs px-0"
          >
            Reviews
          </Button> */}
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full group flex gap-x-4 hover:shadow-lg transition-all min-w-[338px] max-w-[560px] overflow-hidden bg-[#DEDEDE]/30 border border-black-main/50 relative rounded-2xl pt-4 pb-4 px-6 bg-no-repeat bg-right-top">
      <div className="size-12 rounded-full overflow-hidden">
        <img src={data.logo} className="w-full h-full object-contain" />
      </div>
      <div>
        <div className="flex items-center gap-x-2">
          <div className="flex justify-between flex-1 items-center">
            <p className="font-poppins text-black text-lg brightness-0">
              {data.package_name}
            </p>
            {!hideCheckBox && (
              <CheckBox
                checked={isChecked}
                className="border-2 border-green-500 rounded-full hover:bg-green-100"
                setIsChecked={(value) => setIsChecked(value)}
              />
            )}
          </div>
        </div>
        <div className="flex items-center gap-x-3 mt-1">
          <div className="flex gap-2 flex-wrap items-center">
            <p className="bg-[#FFE5D3] text-[10px] py-1 px-2 font-poppins rounded">
              {data.location}
            </p>
            <div className="flex gap-x-1 items-center">
              <span className="text-xs font-poppins font-bold">
                {data.rating}
              </span>
              <StarIcon
                fontSize={12}
                className="text-amber-400 text-xs size-3"
              />
            </div>
          </div>
        </div>
        <div className="mt-1 text-grey-swatch-800 font-poppins">
          <p>{data.org_name}</p>
          <p className="mt-1 text-lg font-medium">{data.loan_amount}</p>
        </div>

        <div className="mt-2 flex flex-col justify-between items-start">
          <p className="text-green-500 text-xs font-poppins">
            Repayment date: {data.repayment_date}
          </p>
          <Button
            variant={"link"}
            className="font-poppins font-light underline bg-transparent text-xs px-0"
          >
            Reviews
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceCard;

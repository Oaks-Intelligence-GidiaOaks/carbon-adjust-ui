// import { StarIcon } from "@heroicons/react/20/solid";
import { Button } from "../ui";
import { BiChevronRight } from "react-icons/bi";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/utils";
// import { formatDate } from "@/lib/utils";
import { defaultPackageImage } from "@/constants";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Oval } from "react-loader-spinner";

export type FinanceOptionCardProps = {
  data: {
    _id: string;
    image?: string;
    name: string;
    coverImg: string;
    locationType: string;
    regions: any[];
    country: string;
    status: string;
    rating?: number;
    annualPercentRate?: number;
    createdBy: {
      _id: string;
      name: string;
    };
    interestRateType: string;
    interestRate: number;
    maxAmount: number;
    maxRepaymentPeriod: number;
    currency: string;
    paymentPeriod: string;
    createdAt: string;
  };
  hideOverlay?: boolean;
  setShowSheet?: Dispatch<SetStateAction<boolean>>;
  setShowInsuranceSheet?: Dispatch<SetStateAction<boolean>>;
  setShowInsurancePackagesSheet?: Dispatch<SetStateAction<boolean>>;
  closeOtherSheets?: () => void;
  isSelected?: boolean;
  setCurrentHIA?: Dispatch<SetStateAction<any>>;
  className?: string;
  type?: string;
  liveData?: boolean;
  mutation?: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    string | undefined,
    unknown
  >;
};

const FinanceOptionCard = ({
  data,
  //   setShowSheet,
  //   setShowInsuranceSheet,
  //   hideOverlay = false,
  //   setCurrentHIA,
  // setShowInsurancePackagesSheet,
  //   liveData = false,
  //   isSelected,
  //   closeOtherSheets,
  className,
  mutation,
}: //   type = "finance",
FinanceOptionCardProps) => {
  // PackageCardProps) => {

  return (
    <div
      className={cn(
        "w-full group hover:shadow-lg transition-all max-w-[560px] overflow-hidden bg-[#F2F2F2] relative rounded-2xl pt-10 pb-5 px-7 bg-[url(/assets/graphics/polygon-graphic.svg)] bg-no-repeat bg-right-top",
        className
      )}
    >
      <div className="flex items-center gap-x-2">
        <div className="size-8">
          <img
            src={data?.coverImg ?? defaultPackageImage}
            className="w-full h-full object-contain"
          />
        </div>
        <p className="font-poppins text-black text-lg brightness-0">
          {data.createdBy?.name}
        </p>
      </div>
      <div className="flex items-center gap-x-3 mt-2">
        <div className="flex gap-2 flex-wrap items-center text-xs">
          <p className="bg-[#FFE5D3] text-[10px] py-1 px-2 font-poppins rounded">
            {data.country}
          </p>
        </div>
      </div>
      <div className="pt-4 line-clamp-2 text-ellipsis font-poppins font-normal flex flex-wrap items-center gap-x-2">
        <p className="text-xs text-grey-swatch-800">
          Loan amount: {data.currency}
          {data.maxAmount}
        </p>
        <div className="h-4 w-[1px] bg-[rgba(0,0,0,0.3)]" />
        <p className="text-xs text-grey-swatch-800">
          Loan duration: {data.maxRepaymentPeriod} {data.paymentPeriod}
        </p>
        <div className="h-4 w-[1px] bg-[rgba(0,0,0,0.3)]" />
        <p className="text-xs text-grey-swatch-800">
          Interest rate: {data?.annualPercentRate ?? 0}%
        </p>
      </div>
      <div className="mt-4">
        <p className="text-blue-main font-poppins">
          {/* Repayment Instalment options */}
          Interest Rate Type
        </p>
        <div className="mt-4 line-clamp-2 text-ellipsis font-poppins font-normal flex flex-wrap items-center gap-x-2">
          {/* <p className="text-xs text-grey-swatch-800">Weekly: {0}%</p>
          <div className="h-4 w-[1px] bg-[rgba(0,0,0,0.3)]" />
          <p className="text-xs text-grey-swatch-800">Monthly: {0}%</p>
          <div className="h-4 w-[1px] bg-[rgba(0,0,0,0.3)]" />
          <p className="text-xs text-grey-swatch-800">
            Yearly: {data?.annualPercentRate ?? 0}%
          </p> */}
          <p className="text-xs text-grey-swatch-800 capitalize">
            {data?.interestRateType}
          </p>
        </div>
      </div>
      <div className="mt-6 flex justify-between gap-6 flex-wrap items-center">
        <div className="flex flex-wrap gap-1 items-center">
          <Button
            // onClick={() => setShowInsuranceSheet && setShowInsuranceSheet(true)}
            onClick={() => mutation?.mutate(data._id)}
            disabled={mutation?.isPending}
            variant={"ghost"}
            className="flex hover:shadow-md transition-all font-poppins bg-blue-main items-center gap-x-2 text-white w-[145px] text-xs min-w-[145px]"
          >
            {mutation?.isPending && data._id === mutation?.variables ? (
              <Oval
                visible={mutation?.isPending}
                height="20"
                width="20"
                color="#ffffff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              <div className="flex items-center justify-center gap-x-2">
                <span>Apply</span>
                <BiChevronRight size={18} />
              </div>
            )}
          </Button>
        </div>
        <Button
          variant={"link"}
          className="font-poppins font-light underline bg-transparent text-xs px-0 opacity-0 pointer-events-none"
        >
          Reviews
        </Button>
      </div>

      {/*  hover overlay */}
      {/* <div
        className={cn(
          "absolute w-full h-full hidden group-hover:flex bg-[#191919]/20 top-0 left-0 pointer-events-none items-center justify-end px-6"
        )}
      >
        <Button
          onClick={() => {
            if (setShowSheet) {
              setShowSheet(true);
            }
            if (closeOtherSheets) {
              closeOtherSheets();
            }
          }}
          className="size-14 rounded-full bg-blue-main border-2 border-white flex justify-center items-center p-0 pointer-events-auto"
        >
          <BiChevronRight className="text-white text-2xl" />
        </Button>
      </div> */}
    </div>
  );
};

export default FinanceOptionCard;

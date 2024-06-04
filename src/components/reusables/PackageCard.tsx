import { StarIcon } from "@heroicons/react/20/solid";
import { Button } from "../ui";
import { BiCheckCircle, BiChevronRight } from "react-icons/bi";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/utils";
import { formatDate } from "@/lib/utils";

export type PackageCardProps = {
  data: {
    org_name: string;
    location: string;
    rating?: string;
    subcontractors?: string;
    services?: string[];
    created_at?: string;
    homes_retrofitted?: string;
    users?: string[];
    logo: string;
    loan_amount?: number;
    loan_duration?: string;
    interest_rate?: number;
    repayment_installment_options?: {
      weekly: number;
      monthly: number;
      quarterly: number;
    };
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
};

const PackageCard = ({
  data,
  setShowSheet,
  setShowInsuranceSheet,
  hideOverlay = false,
  setCurrentHIA,
  // setShowInsurancePackagesSheet,
  liveData = false,
  isSelected,
  closeOtherSheets,
  className,
  type = "finance",
}: any) => {
  // PackageCardProps) => {
  return type !== "finance" ? (
    liveData ? (
      <div
        className={cn(
          "w-full group hover:shadow-lg transition-all max-w-[560px] overflow-hidden bg-[#F2F2F2] relative rounded-2xl pt-10 pb-5 px-7 bg-[url(/assets/graphics/polygon-graphic.svg)] bg-no-repeat bg-right-top",
          className
        )}
      >
        {Boolean(isSelected) && (
          <div className="w-[56px] h-[47px] bg-green-500 absolute top-0 right-0 flex justify-center items-center rounded-bl-2xl">
            <BiCheckCircle fontSize={18} className="text-white text-2xl" />
          </div>
        )}
        <div className="flex items-center gap-x-2">
          <div className="size-8 ">
            <img src={data?.coverImg} className="w-full h-full object-cover" />
          </div>
          <p className="font-poppins text-black text-lg brightness-0">
            {data?.createdBy?.name ?? data?.name}
          </p>
        </div>
        <div className="flex items-center gap-x-3 mt-2">
          <div className="flex gap-2 flex-wrap items-center">
            <p className="bg-[#FFE5D3] text-[10px] py-1 px-2 font-poppins rounded">
              {data.createdBy?.address?.country}
            </p>
            <div className="flex gap-x-1 items-center">
              <span className="text-xs font-poppins font-bold">
                {data?.rating ?? 0}
              </span>
              <StarIcon
                fontSize={12}
                className="text-amber-400 text-xs size-3"
              />
            </div>
          </div>
          <div className="h-4 w-[1px] bg-[rgba(0,0,0,0.3)]" />
          <div className="flex items-center">
            <p className="bg-[#CDFEE4] text-[10px] py-1 px-2 font-poppins rounded text-green-600">
              {data?.subcontractors?.length} Subcontractors
            </p>
          </div>
          <div></div>
        </div>
        <div className="pt-4 line-clamp-2 text-ellipsis font-poppins font-normal text-[#000000ß]">
          {/* {Boolean(data.services && data.services.length)
            ? data.service?.reduce((prev, curr, i, arr) => {
                if (i === arr.length - 1) {
                  return prev + curr;
                }
                return prev + curr + ", ";
              }, "")
            : null} */}
          {data?.service?.name}
        </div>
        <div className="mt-1">
          <p className="text-green-500 text-xs font-poppins">
            {data.homes_retrofitted ?? 0} Homes Retrofitted |{" "}
            {formatDate(data?.created_at ?? data?.createdAt)}
          </p>
        </div>
        <div className="mt-4 flex justify-between gap-6 flex-wrap items-center">
          <div className="flex flex-wrap gap-1 items-center">
            <div className="flex items-center">
              {Boolean(data.users && data.users.length) &&
                data.users?.map((user: string, i: number) => (
                  <div
                    style={{ transform: `translateX(-${i * 10}px)` }}
                    className={`size-8 rounded-full overflow-hidden shadow-lg bg-white`}
                    key={i}
                  >
                    <img src={user} className="object-cover" />
                  </div>
                ))}
            </div>
            <p
              className="text-xs font-light font-poppins"
              style={{
                transform: `translateX(-${
                  data.users?.length === 1 ? 0 : (data.users?.length ?? 0) * 6
                }px)`,
              }}
            >
              {data.users?.length ?? 0} People have used this
            </p>
          </div>
          <Button
            variant={"link"}
            className="font-poppins font-light underline bg-transparent text-xs px-0"
          >
            Reviews
          </Button>
        </div>

        {/*  hover overlay */}
        {!hideOverlay && (
          <div
            className={cn(
              "absolute w-full h-full hidden group-hover:flex bg-[#191919]/20 top-0 left-0 pointer-events-none items-center justify-end px-6"
            )}
          >
            <Button
              onClick={() => {
                if (setCurrentHIA) {
                  setCurrentHIA(data);
                }
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
          </div>
        )}
      </div>
    ) : (
      <div
        className={cn(
          "w-full group hover:shadow-lg transition-all max-w-[560px] overflow-hidden bg-[#F2F2F2] relative rounded-2xl pt-10 pb-5 px-7 bg-[url(/assets/graphics/polygon-graphic.svg)] bg-no-repeat bg-right-top",
          className
        )}
      >
        {Boolean(isSelected) && (
          <div className="w-[56px] h-[47px] bg-green-500 absolute top-0 right-0 flex justify-center items-center rounded-bl-2xl">
            <BiCheckCircle fontSize={18} className="text-white text-2xl" />
          </div>
        )}
        <div className="flex items-center gap-x-2">
          <div className="size-8">
            <img src={data.logo} className="w-full h-full object-contain" />
          </div>
          <p className="font-poppins text-black text-lg brightness-0">
            {data.org_name}
          </p>
        </div>
        <div className="flex items-center gap-x-3 mt-2">
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
          <div className="h-4 w-[1px] bg-[rgba(0,0,0,0.3)]" />
          <div className="flex items-center">
            <p className="bg-[#CDFEE4] text-[10px] py-1 px-2 font-poppins rounded text-green-600">
              {data.subcontractors} Subcontractors
            </p>
          </div>
          <div></div>
        </div>
        <div className="pt-4 line-clamp-2 text-ellipsis font-poppins font-normal text-[#000000ß]">
          {Boolean(data.services && data.services.length)
            ? data.services?.reduce(
                (prev: any, curr: any, i: number, arr: any[]) => {
                  if (i === arr.length - 1) {
                    return prev + curr;
                  }
                  return prev + curr + ", ";
                },
                ""
              )
            : null}
        </div>
        <div className="mt-1">
          <p className="text-green-500 text-xs font-poppins">
            {data.homes_retrofitted} Homes Retrofitted | {data.created_at}
          </p>
        </div>
        <div className="mt-4 flex justify-between gap-6 flex-wrap items-center">
          <div className="flex flex-wrap gap-1 items-center">
            <div className="flex items-center">
              {Boolean(data.users && data.users.length) &&
                data.users?.map((user: string, i: number) => (
                  <div
                    style={{ transform: `translateX(-${i * 10}px)` }}
                    className={`size-8 rounded-full overflow-hidden shadow-lg bg-white`}
                    key={i}
                  >
                    <img src={user} className="object-cover" />
                  </div>
                ))}
            </div>
            <p
              className="text-xs font-light font-poppins"
              style={{
                transform: `translateX(-${
                  data.users?.length === 1 ? 0 : (data.users?.length ?? 0) * 6
                }px)`,
              }}
            >
              {data.users?.length} People have used this
            </p>
          </div>
          <Button
            variant={"link"}
            className="font-poppins font-light underline bg-transparent text-xs px-0"
          >
            Reviews
          </Button>
        </div>

        {/*  hover overlay */}
        {!hideOverlay && (
          <div
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
          </div>
        )}
      </div>
    )
  ) : (
    <div
      className={cn(
        "w-full group hover:shadow-lg transition-all max-w-[560px] overflow-hidden bg-[#F2F2F2] relative rounded-2xl pt-10 pb-5 px-7 bg-[url(/assets/graphics/polygon-graphic.svg)] bg-no-repeat bg-right-top",
        className
      )}
    >
      <div className="flex items-center gap-x-2">
        <div className="size-8">
          <img src={data.logo} className="w-full h-full object-contain" />
        </div>
        <p className="font-poppins text-black text-lg brightness-0">
          {data.org_name}
        </p>
      </div>
      <div className="flex items-center gap-x-3 mt-2">
        <div className="flex gap-2 flex-wrap items-center text-xs">
          <p className="bg-[#FFE5D3] text-[10px] py-1 px-2 font-poppins rounded">
            {data.location}
          </p>
        </div>
      </div>
      <div className="pt-4 line-clamp-2 text-ellipsis font-poppins font-normal flex flex-wrap items-center gap-x-2">
        <p className="text-xs text-grey-swatch-800">
          Loan amount: £{data.loan_amount}
        </p>
        <div className="h-4 w-[1px] bg-[rgba(0,0,0,0.3)]" />
        <p className="text-xs text-grey-swatch-800">
          Loan duration: {data.loan_duration}
        </p>
        <div className="h-4 w-[1px] bg-[rgba(0,0,0,0.3)]" />
        <p className="text-xs text-grey-swatch-800">
          Interest rate: {data.interest_rate}%
        </p>
      </div>
      <div className="mt-4">
        <p className="text-blue-main font-poppins">
          Repayment Instalment options
        </p>
        <div className="mt-4 line-clamp-2 text-ellipsis font-poppins font-normal flex flex-wrap items-center gap-x-2">
          <p className="text-xs text-grey-swatch-800">
            Weekly: {data.repayment_installment_options?.monthly}%
          </p>
          <div className="h-4 w-[1px] bg-[rgba(0,0,0,0.3)]" />
          <p className="text-xs text-grey-swatch-800">
            Monthly: {data.repayment_installment_options?.monthly}%
          </p>
          <div className="h-4 w-[1px] bg-[rgba(0,0,0,0.3)]" />
          <p className="text-xs text-grey-swatch-800">
            Yearly: {data.repayment_installment_options?.monthly}%
          </p>
        </div>
      </div>
      <div className="mt-6 flex justify-between gap-6 flex-wrap items-center">
        <div className="flex flex-wrap gap-1 items-center">
          <Button
            onClick={() => setShowInsuranceSheet && setShowInsuranceSheet(true)}
            variant={"ghost"}
            className="flex hover:shadow-md transition-all font-poppins bg-blue-main items-center gap-x-2 text-white w-[145px] text-xs min-w-[145px]"
          >
            <span>Apply</span>
            <BiChevronRight size={18} />
          </Button>
        </div>
        <Button
          variant={"link"}
          className="font-poppins font-light underline bg-transparent text-xs px-0"
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

export default PackageCard;

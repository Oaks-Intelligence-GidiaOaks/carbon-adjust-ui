import { StarIcon } from "@heroicons/react/20/solid";
import { Button } from "../ui";
import { Dispatch, SetStateAction, useState } from "react";
import CheckBox from "../ui/CheckBox";
import { formatDate } from "@/lib/utils";
// import { subContractors } from "@/constants";

export type SubContractorProps = {
  data: {
    org_name: string;
    location: string;
    rating: string;
    services: string[];
    created_at: string;
    homes_retrofitted: string;
    logo: string;
  };
  setShowSheet?: Dispatch<SetStateAction<boolean>>;
  hideCheckbox?: boolean;
  isNested?: boolean;
  isLiveData?: boolean;
  hiaDetails?: any;
  packages?: object[];
  setPackages?: Dispatch<SetStateAction<object[]>>;
};

const SubContractorCard = ({
  data,
  isNested,
  isLiveData = false,
  hideCheckbox,
  hiaDetails,
  packages,
  setPackages,
}: any) => {
  // }: SubContractorProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const isSubcontractorIncluded = (packageId: any, subcontractorId: any) => {
    const pkg = packages.find((pkg: any) => pkg.package === packageId);
    return pkg ? pkg.subcontractors.includes(subcontractorId) : false;
  };

  const toggleCheck = (packageId: any, subcontractorId: any) => {
    if (setPackages) {
      setPackages((prevPackages: any) => {
        // Check if the package exists
        const packageIndex = prevPackages.findIndex(
          (pkg: any) => pkg.package === packageId
        );
        if (packageIndex === -1) {
          // If package doesn't exist, create a new one
          return [
            ...prevPackages,
            { package: packageId, subcontractors: [subcontractorId] },
          ];
        } else {
          const updatedPackages = [...prevPackages];
          const subcontractors = updatedPackages[packageIndex].subcontractors;
          const subIndex = subcontractors.indexOf(subcontractorId);
          if (subIndex === -1) {
            // If subcontractor doesn't exist, add it
            subcontractors.push(subcontractorId);
          } else {
            // If subcontractor exists, remove it
            subcontractors.splice(subIndex, 1);
            // If no subcontractors left, remove the package
            if (subcontractors.length === 0) {
              updatedPackages.splice(packageIndex, 1);
            }
          }
          return updatedPackages;
        }
      });
    }
  };

  return !isNested ? (
    isLiveData ? (
      <div className="w-full group hover:shadow-lg transition-all min-w-[340px] h-[192px] max-w-[560px] overflow-hidden bg-white border border-black-main/50 relative rounded-2xl pt-4 pb-4 px-6 bg-no-repeat bg-right-top">
        <div className="flex items-center gap-x-2">
          <div className="size-8 bg-white rounded">
            <img
              src={data.dp ?? "/assets/graphics/institution.svg"}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex justify-between flex-1 items-center">
            <p className="font-poppins text-black text-lg brightness-0">
              {data?.name}
            </p>
            {!hideCheckbox && (
              <CheckBox
                checked={isSubcontractorIncluded(hiaDetails._id, data._id)}
                className="border-2 border-green-500 rounded-full hover:bg-green-100"
                setIsChecked={() => toggleCheck(hiaDetails._id, data._id)}
              />
            )}
          </div>
        </div>
        <div className="flex items-center gap-x-3 mt-2">
          <div className="flex gap-2 flex-wrap items-center">
            <p className="bg-[#FFE5D3] text-[10px] py-1 px-2 font-poppins rounded">
              {data?.address.country}
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
        </div>
        <div className="pt-6 line-clamp-2 text-ellipsis font-poppins font-normal text-[#000000ß]">
          {data?.specializations?.reduce(
            (prev: any, curr: any, i: any, arr: any) => {
              if (i === arr.length - 1) {
                return prev + curr.name;
              }
              return prev + curr.name + ", ";
            },
            ""
          )}
          {/* {data.services.reduce((prev, curr, i, arr) => {
            if (i === arr.length - 1) {
              return prev + curr;
            }
            return prev + curr + ", ";
          }, "")} */}
        </div>
        <div className="mt-1 flex justify-between items-center">
          <p className="text-green-500 text-xs font-poppins">
            {/* {console.log(data)} */}
            {data?.homes_retrofitted ?? 0} Homes Retrofitted |{" "}
            {data.createdAt && formatDate(data.createdAt)}
          </p>
          <Button
            variant={"link"}
            className="font-poppins font-light underline bg-transparent text-xs px-0"
          >
            Reviews
          </Button>
        </div>
      </div>
    ) : (
      <div className="w-full group hover:shadow-lg transition-all min-w-[340px] h-[192px] max-w-[560px] overflow-hidden bg-white border border-black-main/50 relative rounded-2xl pt-4 pb-4 px-6 bg-no-repeat bg-right-top">
        <div className="flex items-center gap-x-2">
          <div className="size-8">
            <img src={data.logo} className="w-full h-full object-contain" />
          </div>
          <div className="flex justify-between flex-1 items-center">
            <p className="font-poppins text-black text-lg brightness-0">
              {data.org_name}
            </p>
            {!hideCheckbox && (
              <CheckBox
                checked={isChecked}
                className="border-2 border-green-500 rounded-full hover:bg-green-100"
                setIsChecked={(value) => setIsChecked(value)}
              />
            )}
          </div>
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
        </div>
        <div className="pt-6 line-clamp-2 text-ellipsis font-poppins font-normal text-[#000000ß]">
          {data.services.reduce((prev: any, curr: any, i: any, arr: any) => {
            if (i === arr.length - 1) {
              return prev + curr;
            }
            return prev + curr + ", ";
          }, "")}
        </div>
        <div className="mt-1 flex justify-between items-center">
          <p className="text-green-500 text-xs font-poppins">
            {data.homes_retrofitted} Homes Retrofitted | {data.created_at}
          </p>
          <Button
            variant={"link"}
            className="font-poppins font-light underline bg-transparent text-xs px-0"
          >
            Reviews
          </Button>
        </div>
      </div>
    )
  ) : (
    <div className="w-full group hover:shadow-lg transition-all max-w-[560px] overflow-hidden bg-white border border-black-main/50 relative pt-4 pb-4 px-6 bg-no-repeat bg-right-top">
      <div className="flex items-center gap-x-2">
        <div className="size-8">
          <img src={data.logo} className="w-full h-full object-contain" />
        </div>
        <div className="flex justify-between flex-1 items-center">
          <p className="font-poppins text-black text-lg brightness-0">
            {data.org_name}
          </p>
          <div className="flex gap-x-1 items-center">
            <span className="text-xs font-poppins font-bold">
              {data.rating}
            </span>
            <StarIcon fontSize={12} className="text-amber-400 text-xs size-3" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-3 mt-2">
        <div className="flex gap-2 flex-wrap items-center">
          <p className="bg-[#FFE5D3] text-[10px] py-1 px-2 font-poppins rounded">
            {data.location}
          </p>
        </div>
      </div>
      <div className="mt-1 flex justify-between items-center">
        <p className="text-green-500 text-xs font-poppins">
          {data.homes_retrofitted} Homes Retrofitted | {data.created_at}
        </p>
        <Button
          variant={"link"}
          className="font-poppins font-light underline bg-transparent text-xs px-0"
        >
          Reviews
        </Button>
      </div>
    </div>
  );
};

export default SubContractorCard;

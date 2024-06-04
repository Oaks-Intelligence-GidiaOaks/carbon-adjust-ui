// import React from "react";

import axiosInstance from "@/api/axiosInstance";
import InsurancePackageGrid from "@/components/grid/packages/InsurancePackageGrid";
// import InsuranceCard from "@/components/reusables/InsuranceCard";
import InsurancePackage from "@/components/reusables/InsurancePackage";
import NoPackages from "@/components/reusables/NoPackages";
import { Button } from "@/components/ui";
// import FinancePackageCard from "@/components/ui/FinancePackageCard";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

// type Props = {};

const Packages = () => {
  const navigate = useNavigate();
  const insurancePackages = useQuery({
    queryKey: ["get-insurance-packages"],
    queryFn: () => axiosInstance.get(`/packages/ins`),
  });

  if (
    insurancePackages.isSuccess &&
    insurancePackages.data.data.data.packages.length < 1
  ) {
    return <NoPackages route="/insurance/packages/add" />;
  }

  {
    /* cards */
  }
  {
    console.log(insurancePackages.data?.data.data.packages);
  }
  return (
    <div className="overflow-x-scroll min-h-screen">
      {insurancePackages.isLoading && (
        <div className="mt-10 flex justify-center items-center">
          <Oval
            visible={insurancePackages.isLoading}
            height="20"
            width="20"
            color="#ffffff"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      {insurancePackages.isSuccess &&
        insurancePackages.data.data.data.packages.length < 1 && (
          // <p>No packages created</p>
          <NoPackages route="/finance/packages/add" />
        )}

      {insurancePackages.isSuccess &&
        insurancePackages.data?.data.data.packages.length >= 1 && (
          <div className="mt-4 px-2">
            <p className="text-xl font-poppins text-main font-medium">
              Packages
            </p>
            <p className="my-4 font-poppins text-main/80">
              Here are your recently created packages
            </p>
            <div className="w-0 overflow-visible flex gap-4 mt-10">
              {insurancePackages.data.data.data.packages.map(
                (p: any, i: number) => (
                  <InsurancePackage key={i} data={p} />
                )
              )}
            </div>
            <div className="mt-5">
              <Button
                className="flex gap-x-2 items-center font-poppins"
                onClick={() => navigate("/insurance/packages/add")}
              >
                <span>Create package</span>
                <div className="size-6 rounded-full bg-white/10">
                  <PlusIcon className="text-white" />
                </div>
              </Button>
            </div>
          </div>
        )}

      {/* table */}
      {insurancePackages.isSuccess &&
        insurancePackages.data.data.data.packages.length >= 1 && (
          <div className="">
            <InsurancePackageGrid
              data={(insurancePackages as any).data.data.data.packages}
              isUpdating={insurancePackages.isLoading}
            />
            <div className="w-full flex flex-wrap gap-x-4"></div>
          </div>
        )}
    </div>
  );
};

export default Packages;

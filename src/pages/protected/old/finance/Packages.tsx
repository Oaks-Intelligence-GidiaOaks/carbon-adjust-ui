// import React from "react";

import axiosInstance from "@/api/axiosInstance";
import FinancePackageGrid from "@/components/grid/packages/FinancePackageGrid";
import NoPackages from "@/components/reusables/NoPackages";
import { Button } from "@/components/ui";
import FinancePackageCard from "@/components/ui/FinancePackageCard";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

// type Props = {};

const Packages = () => {
  const navigate = useNavigate();
  const financePackages = useQuery({
    queryKey: ["get-finance-packages"],
    queryFn: () => axiosInstance.get(`/packages/fin`),
  });

  if (
    financePackages.isSuccess &&
    financePackages.data.data.data.packages.length < 1
  ) {
    return <NoPackages route="/finance/packages/add" />;
  }

  {
    /* cards */
  }
  {
    console.log(financePackages.data?.data.data.packages);
  }
  return (
    <div className="overflow-x-scroll mt-[40px]">
      {financePackages.isLoading && (
        <Oval
          visible={financePackages.isLoading}
          height="20"
          width="20"
          color="#ffffff"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      {financePackages.isSuccess &&
        financePackages.data.data.data.packages.length < 1 && (
          // <p>No packages created</p>
          <NoPackages route="/finance/packages/add" />
        )}

      {financePackages.isSuccess &&
        financePackages.data?.data.data.packages.length >= 1 && (
          <div>
            <div className="w-0 overflow-visible flex gap-4">
              {financePackages.data.data.data.packages.map(
                (p: any, i: number) => (
                  <FinancePackageCard
                    key={i}
                    data={p}
                    home_owner={false}
                    isPlaceholder={false}
                  />
                )
              )}
            </div>
            <div className="mt-5">
              <Button
                className="flex gap-x-2 items-center font-poppins"
                onClick={() => navigate("/finance/packages/add")}
              >
                <span>Create package</span>
                <div className="size-6 rounded-full bg-white/10">
                  <PlusIcon className="text-white" />
                </div>
              </Button>
            </div>
            {/* table */}
            {financePackages.isSuccess &&
              financePackages.data.data.data.packages.length >= 1 && (
                <div className="">
                  <FinancePackageGrid
                    data={(financePackages as any).data.data.data.packages}
                    isUpdating={financePackages.isLoading}
                  />
                  <div className="w-full flex flex-wrap gap-x-4"></div>
                </div>
              )}
          </div>
        )}
    </div>
  );
};

export default Packages;

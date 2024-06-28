// import React from 'react'

import PackagesGrid from "@/components/grid/merchant/PackagesGrid";
import { getAdminPackages } from "@/services/homeOwner";
import { transformPackagesGridData } from "@/utils/reshape";
import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";

const Packages = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["get-admin-packages"],
    queryFn: () => getAdminPackages(),
  });

  const tablePkgs = isSuccess ? transformPackagesGridData(data.packages) : [];

  return (
    <div className="w-full overflow-x-scroll">
      {/* table */}
      <div className="mt-[29px]">
        <div className="flex-center justify-between">
          <h2 className="font-[600] text-base ">Package List</h2>

          {/* <Link to="/admin/packages/all" className="">
            <button className="rounded-[8px] h-[26px] hover:bg-gray-100 flex-center gap-1 text-[#575757] p-2 px-3 text-xs">
              <span>View all</span>
              <MdOutlineKeyboardArrowRight />
            </button>
          </Link> */}
        </div>

        {/* table */}
        <div className="-mt-3">
          <PackagesGrid data={tablePkgs} isUpdating />
        </div>
      </div>
    </div>
  );
};

export default Packages;

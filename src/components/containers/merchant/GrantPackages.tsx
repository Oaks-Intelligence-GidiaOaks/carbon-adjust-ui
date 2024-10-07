import { RootState } from "@/app/store";
import ChoosePackageType from "@/components/dialogs/ChoosePackageType";
import PackagesGrid from "@/components/grid/merchant/PackagesGrid";
import MerchantGrantCard from "@/components/reusables/MerchantGrantCard";
import { UserRole } from "@/interfaces/user.interface";
import { getGrantPackages } from "@/services/merchantService";
import { transformGrantPackages } from "@/utils/reshape";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const GrantPackages = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [showModal, setShowModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const {
    data: grantPkgs,
    isSuccess,
    // isLoading,
  } = useQuery({
    queryKey: ["get-grant-packages"],
    queryFn: () => getGrantPackages({}),
  });

  const tablePkgs = isSuccess
    ? transformGrantPackages(grantPkgs.data.packages)
    : [];

  const handleCreatePackageClick = () => {
    if (user?.roles.includes(UserRole.SUPER_MERCHANT)) {
      setShowModal(true);
    } else {
      navigate("/merchant/packages/new");
    }
  };

  return (
    <div className="px-3 lg:px-4 sm:max-w-[calc(100vw-280px)]">
      <div className="flex-center justify-between">
        <div className="flex flex-col gap-[6px] my-4">
          <h2 className="font-[600] text-lg ">Grants</h2>
        </div>

        <button
          onClick={handleCreatePackageClick}
          className=" flex-center gap-3 h-[46px] text-sm bg-[#2196F3] rounded-[10px] text-white px-4"
        >
          <span className="hidden md:inline-flex">Create package</span>

          <span className="rounded-full grid bg-white bg-opacity-15  place-items-center h-[30px] w-[30px]">
            <FiPlus color="#FFFFFF" />
          </span>
        </button>
      </div>

      {/* Flat Lists */}
      <div className="w-full overflow-x-scroll scrollbar-hide">
        <div className="flex items-stretch gap-[20px] mt-[24px] pb-5 w-full">
          {Array.from(tablePkgs.slice(0, 4), (item) => (
            <MerchantGrantCard {...item} />
          ))}
        </div>
      </div>

      {/* Table section */}
      <div className="mt-[29px]">
        <div className="flex-center justify-between">
          <h2 className="font-[600] text-base ">Package List</h2>

          <Link to="/merchant/packages/all" className="">
            <button className="rounded-[8px] h-[26px] hover:bg-gray-100 flex-center gap-1 text-[#575757] p-2 px-3 text-xs">
              <span>View all</span>
              <MdOutlineKeyboardArrowRight />
            </button>
          </Link>
        </div>

        {/* table */}
        <div className="-mt-3">
          <PackagesGrid data={tablePkgs} isUpdating isGrant />
        </div>
      </div>

      {showModal && (
        <ChoosePackageType setShowModal={setShowModal} showModal={showModal} />
      )}
    </div>
  );
};

export default GrantPackages;

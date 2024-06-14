import PackagesGrid from "@/components/grid/merchant/PackagesGrid";
import { FiPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
// import packagesDummy from "@/dummy/packages.json";
import { useQuery } from "@tanstack/react-query";
import { getAllPackages } from "@/services/merchantService";
import { transformPackagesGridData } from "@/utils/reshape";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui";
// import TableModal from "@/components/reusables/TableModal";
// import { GoVerified } from "react-icons/go";

type Props = {};

const AllPackages = (_: Props) => {
  const navigate = useNavigate();
  const {
    data: allPackages,
    isSuccess: isAllPackagesSuccess,
    // isLoading,
  } = useQuery({
    queryKey: ["get-all-packages"],
    queryFn: () => getAllPackages(),
  });

  const tablePkgs = isAllPackagesSuccess
    ? transformPackagesGridData(allPackages.data.packages)
    : [];

  const NoPackages = () => (
    <div className="h-[80vh] grid place-items-center">
      <div className=" h-fit w-fit text-[#575757] font-[400] flex flex-col gap-3 items-center ">
        <img
          src="/assets/graphics/no-package.svg"
          className=""
          alt="no package"
        />

        <h2 className="font-[600] text-lg ">No packages created yet</h2>

        <p className="text-sm font-[400] w-2/5 text-center">
          You have not created a package yet. Your listings will appear here
          when you start offering your services.
        </p>

        <Link to="/merchant/packages/new">
          <button className="blue-gradient w-[130px] rounded-[12px] text-white text-sm font-[500] h-[46px] min-w-[300px]">
            Create Package
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="px-2 xl:px-8 pt-2">
      <div className="my-4">
        <Button
          onClick={() => navigate(-1)}
          variant={"ghost"}
          className="flex items-center gap-x-2 h-5 p-0 hover:bg-transparent"
        >
          <ChevronLeftIcon className="size-4" />
          <p>Back</p>
        </Button>
      </div>
      <div className="flex-center justify-between">
        <div className="flex flex-col gap-[6px]">
          <h2 className="font-[600] text-lg ">Packages</h2>

          <h6 className="font-[400] text-sm text-[#575757]">
            Find all your created packages here.
          </h6>
        </div>

        <Link to="/merchant/packages/new">
          <button className=" flex-center gap-3 h-[46px] bg-[#2196F3] rounded-[10px] text-white px-4">
            <span>Create package</span>

            <span className="rounded-full bg-white bg-opacity-15 grid place-items-center h-[30px] w-[30px]">
              <FiPlus color="#FFFFFF" />
            </span>
          </button>
        </Link>
      </div>

      {/* <TableModal
        iconColor="#FF3E3E"
        btnTextOneAction={() => {}}
        btnTextTwoAction={() => {}}
        Icon={RiDeleteBin6Line}
        btnTextOne="Cancel"
        btnTextTwo="Delete"
         btnTextOneStyle="text-[#4A4848]"
        textOne="Delete Package?"
        textTwo="Are you sure you want to delete this package?"
      /> */}

      {/* <TableModal
        iconColor="#05CD99"
        btnTextOneAction={() => {}}
        btnTextTwoAction={() => {}}
        Icon={GoVerified}
        btnTextOne="Close"
        btnTextOneStyle=" blue-gradient text-white hover:bg-gradient-to-t"
        textOne="Application deleted successfuly"
        textTwo="You have successfully removed the package. It will no longer appear in Users’ MarketPlace."
      /> */}

      {/* table */}
      {/* <div className="-mt-3">
        <PackagesGrid data={packagesDummy} isUpdating />
      </div> */}
      {Boolean(tablePkgs.length) ? (
        <div className="-mt-3">
          <PackagesGrid data={tablePkgs} isUpdating />
        </div>
      ) : (
        <NoPackages />
      )}
    </div>
  );
};

export default AllPackages;

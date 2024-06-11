import PackagesGrid from "@/components/grid/merchant/PackagesGrid";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import packagesDummy from "@/dummy/packages.json";
// import TableModal from "@/components/reusables/TableModal";
// import { GoVerified } from "react-icons/go";

type Props = {};

const AllPackages = (_: Props) => {
  return (
    <div className="px-2 xl:px-8 pt-2">
      <div className="flex-center justify-between">
        <div className="flex flex-col gap-[6px]">
          <h2 className="font-[600] text-lg ">Packages</h2>

          <h6 className="font-[400] text-sm text-[#575757]">
            Here are some of your recently created packages
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
      <div className="-mt-3">
        <PackagesGrid data={packagesDummy} isUpdating />
      </div>
    </div>
  );
};

export default AllPackages;

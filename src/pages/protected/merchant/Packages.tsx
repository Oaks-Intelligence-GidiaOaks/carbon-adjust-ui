import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import NewPackageCard from "@/components/reusables/NewPackageCard";
import { DataTable } from "@/components/tables/DataTable";
import { Link } from "react-router-dom";

type Props = {};

const Packages = (_: Props) => {
  const NoPackages = () => (
    <div className="h-[80vh] grid place-items-center">
      <h2 className="text-lg font-[600] mr-auto text-[#333333]">Packages</h2>

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
          <button className="blue-gradient w-[130px] rounded-[12px] text-white text-sm font-[500] h-[46px]">
            Create Package
          </button>
        </Link>
      </div>
    </div>
  );

  if (false) {
    return <NoPackages />;
  }

  return (
    <div>
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

      {/* Flat Lists */}
      <div className="flex items-stretch gap-[20px] mt-[24px]">
        {Array.from({ length: 3 }, (_) => (
          <NewPackageCard name="string" cost="string" rating={5} />
        ))}
      </div>

      <div className="mt-[29px]">
        <div className="flex-center justify-between">
          <h2 className="font-[600] text-base ">Package List</h2>

          <Link to="/merchant/packages/all" className="">
            <button className="rounded-[8px] h-[26px] flex-center gap-1  text-[#575757] border-[#575757] border p-2 px-3 text-xs">
              <span>View all</span>
              <MdOutlineKeyboardArrowRight />
            </button>
          </Link>
        </div>

        {/* table */}
        <div className="mt-6">
          <DataTable columns={[]} data={[]} />
        </div>
      </div>
    </div>
  );
};

export default Packages;

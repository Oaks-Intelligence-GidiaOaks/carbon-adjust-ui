import ApplicationsGrid from "@/components/grid/merchant/ApplicationsGrid";
import Search from "@/components/ui/Search";
import { getSuperMerchantSubApplications } from "@/services/merchantService";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

const SubApplications = () => {
  // @ts-ignore
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["get-sub-applications"],
    queryFn: () => getSuperMerchantSubApplications(),
  });

  return (
    <div className=" px-6 py-4`">
      {/* Super merchant */}
      <div className="flex-center gap-6">
        <Link to="/merchant/applications" className="w-fit ">
          <MdOutlineArrowBack size={30} />
        </Link>

        <h2 className="font-[600] text-2xl tracking-tight">
          Mathew Daniels Applications
        </h2>
      </div>

      {/* table */}
      <div className=" mt-6">
        <Search />

        <div className="">
          <ApplicationsGrid data={[]} isUpdating />
        </div>
      </div>
    </div>
  );
};

export default SubApplications;

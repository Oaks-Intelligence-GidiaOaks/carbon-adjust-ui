import ApplicationsGrid from "@/components/grid/merchant/ApplicationsGrid";
import Search from "@/components/ui/Search";
import { getSuperMerchantSubApplications } from "@/services/merchantService";
import { transformApplicationsGridData } from "@/utils/reshape";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineArrowBack } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

const SubApplications = () => {
  const { applicationId } = useParams();

  // @ts-ignore
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["get-sub-applications"],
    queryFn: () => getSuperMerchantSubApplications(applicationId!),
  });

  const tableApps = isSuccess
    ? transformApplicationsGridData(data.data.applications)
    : [];

  const customerName = tableApps[0]?.customer.name;

  return (
    <div className=" px-6 py-4`">
      {/* Super merchant */}
      <div className="flex-center gap-6">
        <Link to="/merchant/applications" className="w-fit ">
          <MdOutlineArrowBack size={30} />
        </Link>

        <h2 className="font-[600] text-2xl tracking-tight">
          {customerName || ""} Applications
        </h2>
      </div>

      {/* table */}
      <div className=" mt-6">
        <Search />

        <div className="">
          <ApplicationsGrid data={tableApps} isUpdating isGrant />
        </div>
      </div>
    </div>
  );
};

export default SubApplications;

import GrantApplicationsGrid from "@/components/grid/merchant/GrantApplicationsGrid";
import Loading from "@/components/reusables/Loading";
import { getAllApplications } from "@/services/merchantService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Props = {};

const GrantApplications = (_: Props) => {
  // @ts-ignore
  const [params, setParams] = useState({
    page: 1,
    limit: 100,
  });

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["get-grant-applications"],
    queryFn: () =>
      getAllApplications("Grant_Package", params.page, params.limit),
  });

  const NoApplications = () => (
    <div className="h-[80vh] grid place-items-center">
      <h2 className="text-lg font-[600] mr-auto text-[#333333]">
        Applications
      </h2>

      <div className=" h-fit w-fit text-[#575757] font-[400] flex flex-col gap-3 items-center ">
        <img src="/assets/graphics/no-package.svg" className="" alt="" />

        <h2 className="font-[600] text-lg ">No Applications yet</h2>

        <p className="text-sm font-[400] w-2/5 text-center">
          Looks like you don’t any applications yet. Your orders will appear
          here when users request your service.
        </p>
      </div>
    </div>
  );

  const tableApps = isSuccess ? data.data.orders : [];

  if (isLoading) {
    return (
      <div className="h-[40vh] grid place-items-center">
        <Loading message="laoding applications..." />
      </div>
    );
  }

  if (!tableApps.length) {
    return <NoApplications />;
  }

  return (
    <div className="px-3 lg:px-4">
      <h2 className="font-[600] text-lg pt-2 ">Grant Applications</h2>

      {/* table */}
      <div className="-mt-3">
        <GrantApplicationsGrid isUpdating data={tableApps} />
      </div>
    </div>
  );
};

export default GrantApplications;

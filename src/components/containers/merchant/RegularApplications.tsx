import ApplicationsGrid from "@/components/grid/merchant/ApplicationsGrid";
import Loading from "@/components/reusables/Loading";
import { getAllApplications } from "@/services/merchantService";
import { transformApplicationsGridData } from "@/utils/reshape";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Props = {};

const RegularApplications = (_: Props) => {
  // @ts-ignore
  const [params, setParams] = useState({
    page: 1,
    limit: 100,
  });

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["get-applications"],
    queryFn: () =>
      getAllApplications("Regular_Package", params.page, params.limit),
  });

  const NoApplications = () => (
    <div className="h-[80vh] grid place-items-center">
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

  const tableApps = isSuccess
    ? transformApplicationsGridData(data.data.orders)
    : [];

  return (
    <div className="px-3 lg:px-4">
      <h2 className="font-[600] text-lg pt-2 ">Applications</h2>

      {isLoading ? (
        <div className="grid place-items-center h-32 ">
          <Loading message="Loading.." />
        </div>
      ) : !tableApps.length ? (
        <NoApplications />
      ) : (
        <div className="-mt-3">
          <ApplicationsGrid isUpdating data={tableApps} />
        </div>
      )}
    </div>
  );
};

export default RegularApplications;

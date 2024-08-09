import AdminPackagesGrid from "@/components/grid/admin/AdminPackagesGrid";
import { handleTableDownload } from "@/lib/utils";
import { getAdminPackages } from "@/services/homeOwner";
import { transformPackagesGridData } from "@/utils/reshape";
import { useQuery } from "@tanstack/react-query";

const Packages = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["get-packages"],
    queryFn: () => getAdminPackages(),
  });

  const tablePkgs = isSuccess
    ? transformPackagesGridData(data.data.packages)
    : [];

  const tData = tablePkgs.length
    ? tablePkgs.map(({ _id, ...rest }, i) => ({
        S_N: i + 1,
        ...rest,
      }))
    : [];

  return (
    <div className="w-full overflow-x-scroll px-3 md:px-5">
      {/* table */}
      <div className="mt-[29px]">
        <div className="flex-center justify-between">
          <h2 className="font-[600] text-base ">All Packages</h2>

          <button
            onClick={() => handleTableDownload(tData)}
            className="border px-5 text-sm font-poppins font-[600] text-white blue-gradient py-2 rounded-md mr-8"
          >
            Download
          </button>
        </div>

        {/* table */}
        <div className="-mt-3">
          <AdminPackagesGrid data={tablePkgs} isUpdating />
        </div>
      </div>
    </div>
  );
};

export default Packages;

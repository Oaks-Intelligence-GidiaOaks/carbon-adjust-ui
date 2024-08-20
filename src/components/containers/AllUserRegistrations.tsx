// @ts-ignore
import { FiPlus } from "react-icons/fi";
// @ts-ignore
import { Link } from "react-router-dom";
import UsersGrid from "../grid/admin/UsersGrid";
import { formatDate, handleTableDownload } from "@/lib/utils";
import MerchantGrid from "../grid/admin/MerchantGrid";

const AllUserRegistrations = (props: { data: any; tableHeader: string }) => {
  const tData = props.data.map(
    // @ts-ignore
    ({ roles, passwordLastResetAt, createdAt, ...rest }) => ({
      roles: roles[0],
      createdAt: formatDate(createdAt),
      ...rest,
    })
  );

  return (
    <div className="pt-4">
      <div className="flex-center justify-between">
        <h2 className="pl-4  font-[600] text-base">{props.tableHeader}</h2>

        <button
          onClick={() => handleTableDownload(tData)}
          className="border px-5 text-sm font-poppins font-[600] text-white blue-gradient py-2 rounded-md mr-8"
        >
          Download
        </button>
      </div>

      <div className="w-full">
        {props.tableHeader === "Merchants" ? (
          <MerchantGrid data={props.data} />
        ) : (
          <UsersGrid data={props.data} isUpdating={false} />
        )}
      </div>
    </div>
  );
};

export default AllUserRegistrations;

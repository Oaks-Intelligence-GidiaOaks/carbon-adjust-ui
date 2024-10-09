import StaffGrid from "@/components/grid/merchant/StaffGrid";
import { Button } from "@/components/ui";
import { getAllStaff } from "@/services/merchant";
import { transformStaffGridData } from "@/utils/reshape";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type Props = {};

const Staff = (_: Props) => {
  const data = useQuery({
    queryKey: ["get-all-staff"],
    queryFn: () => getAllStaff(),
  });

  const tableStaff = data.isSuccess
    ? transformStaffGridData(data.data.data.data.users)
    : [];

  return (
    <div className="min-h-screen">
      <div className="flex-center justify-between p-4">
        <h2 className="page-header">Staff</h2>
        <Link to={`/merchant/staff/add`} className="">
          <Button className="flex items-center gap-2">
            <span className="text-white">Add staff</span>

            <img
              src="/assets/icons/plus-circle.svg"
              className="h-6 w-6"
              alt="carbon-adjust icon"
            />
          </Button>
        </Link>
      </div>

      {/* table */}
      <div className="-mt-3 px-4 w-full">
        <StaffGrid data={tableStaff} isUpdating />
      </div>
    </div>
  );
};

export default Staff;

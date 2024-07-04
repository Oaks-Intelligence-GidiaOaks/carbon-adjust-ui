// import { Grid } from "@/components/grid";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";

type Props = {};

const Staff = (_: Props) => {
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

      <div className="mt-4">
        {/* <Grid data={staff} pageSize={40} tableStyles={` `} /> */}
      </div>
    </div>
  );
};

export default Staff;

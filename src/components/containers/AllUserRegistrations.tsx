// @ts-ignore
import { FiPlus } from "react-icons/fi";
// @ts-ignore
import { Link } from "react-router-dom";
import UsersGrid from "../grid/admin/UsersGrid";

const AllUserRegistrations = (props: { data: any }) => {
  return (
    <div className="pt-4">
      {/* <Link to="/merchant/packages/new">
        <button className=" flex-center gap-3 h-[46px] text-sm bg-[#2196F3] rounded-[10px] text-white px-4">
          <span className="hidden md:inline-flex">Add User</span>

          <span className="rounded-full grid bg-white bg-opacity-15  place-items-center h-[30px] w-[30px]">
            <FiPlus color="#FFFFFF" />
          </span>
        </button>
      </Link> */}

      <div className="w-full">
        <UsersGrid data={props.data} isUpdating={false} />
      </div>
    </div>
  );
};

export default AllUserRegistrations;

import { BiSearch } from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui";
import { PlusIcon } from "@/assets/icons";

const AddedDevices = () => {
  return (
    <div className="mt-5">
      {" "}
      <div className="flex justify-between flex-wrap mt-[15px] gap-5">
        <div className="flex items-center justify-center gap-5">
          <Button variant={"outline"} className="flex gap-2 ">
            <IoFilterSharp />
            <span className="md:block hidden">Filter by date</span>
          </Button>
          <div className="relative border border-border rounded-lg h-10 p-0 bg-white md:w-[350px] w-[250px]">
            <BiSearch
              className="absolute top-2 left-2.5 opacity-40"
              size={24}
            />
            <input
              name="search"
              placeholder="Search here..."
              className="h-full w-full pl-10 m-0 bg-transparent text-sm outline-none border-none"
              //   value={searchQuery}
              //   onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center">
          <Button
            //   onClick={() => setShowModal(true)}
            variant={"outline"}
            className="rounded-[20px] border-blue-600 flex-center gap-1 text-blue-600"
          >
            Group Devices
          </Button>

          <Link className="ml-5" to="/dashboard/transport/add">
            <Button className="rounded-[20px] flex-center gap-1 ">
              <span>Add Device</span>
              <PlusIcon />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddedDevices;

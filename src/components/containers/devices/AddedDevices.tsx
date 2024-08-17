import { BiSearch } from "react-icons/bi";
import DeviceCard from "./DeviceCard";

const AddedDevices = () => {
  return (
    <div>
      <div className="flex-center mt-[15px]">
        <div className="relative border border-border rounded-lg h-10 p-0 bg-white md:w-[350px]">
          <BiSearch className="absolute top-2 left-2.5 opacity-40" size={24} />
          <input
            name="search"
            placeholder="Search here"
            className="h-full w-full pl-10 m-0 bg-transparent text-sm outline-none border-none"
            onChange={() => {}}
          />
        </div>
      </div>

      <div className="mt-[15px] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-5">
        {Array.from({ length: 4 }, (_, i) => (
          <DeviceCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default AddedDevices;

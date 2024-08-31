import { PlusIcon } from "@/assets/icons";
import { cn } from "@/utils";
import { Link } from "react-router-dom";

const NoDevices = () => {
  return (
    <div className="w-fit mx-auto mt-16 grid place-items-center gap-3 max-w-[650px]">
      <img src="/assets/graphics/deviceGrad.svg" alt="" className="" />

      <div className="w-fit mx-auto text-center">
        <h3 className="text-[#495057] font-[600] text-xl">
          No device has been added
        </h3>

        <p className="text-[#6C6262] font-[400]">
          You have no active DR(Demand response) application
        </p>

        <Link to="/merchant/devices/add">
          <button className="mt-6 mx-auto border gap-2 h-[48px] bg-[#D1D3DA] rounded-lg flex-center px-6 text-white font-[600] text-sm">
            <span>Add device</span>
            <PlusIcon className={cn()} />
          </button>
        </Link>
      </div>

      <p className="mt-[60px] font-[400] italic text-sm text-[#0E72CB] text-center">
        “From 1990 to 2019, the total warming effect from greenhouse gases added
        by humans to the Earth's atmosphere increased by 45 percent. The warming
        effect associated with carbon dioxide alone increased by 36 percent.”
      </p>
    </div>
  );
};

export default NoDevices;

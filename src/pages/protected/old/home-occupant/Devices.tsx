import { Button } from "@/components/ui";
import { cn } from "@/utils";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type Props = {};

const Devices = (_: Props) => {
  const [currentTab, setCurrentTab] = useState("added");

  return (
    <div className="min-h-screen bg-no-repeat bg-fixed bg-contain bg-bottom bg-[url(/assets/graphics/devices-bg.svg)] bg-opacity-50">
      <div className="py-4 sticky top-0 px-6 bg-grey-swatch-300 flex justify-between items-center gap-[10%]">
        <div className="flex flex-1 justify-around items-center">
          <Button
            variant="ghost"
            className={cn(
              "bg-white h-8 px-8 font-poppins",
              currentTab === "added"
                ? "bg-white shadow"
                : "bg-transparent hover:bg-grey-swatch-400"
            )}
            onClick={() => setCurrentTab("added")}
          >
            Added Devices
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "bg-white h-8 px-8 font-poppins",
              currentTab === "dispatched"
                ? "bg-white shadow"
                : "bg-transparent hover:bg-grey-swatch-400"
            )}
            onClick={() => setCurrentTab("dispatched")}
          >
            Dispatched Devices
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "bg-white h-8 px-8 font-poppins",
              currentTab === "deactivated"
                ? "bg-white shadow"
                : "bg-transparent hover:bg-grey-swatch-400"
            )}
            onClick={() => setCurrentTab("deactivated")}
          >
            Deactivated Devices
          </Button>
          {/* <Button>Dispatched Devices</Button>
          <Button>Deactivated Devices</Button> */}
        </div>
        <div className="flex justify-around items-center">
          <Button
            variant="default"
            disabled
            className="bg-white h-8 shadow px-8 flex gap-2 justify-center items-center font-poppins"
            onClick={() => setCurrentTab("add")}
          >
            <span className="text-white">Add Device</span>
            <PlusCircleIcon
              width={24}
              className="text-white"
              color="white"
              fill="white"
            />
          </Button>
          {/* <Button>Dispatched Devices</Button>
          <Button>Deactivated Devices</Button> */}
        </div>
      </div>
      <div className="flex justify-center bg-white/70 min-h-screen">
        <div className="max-w-[500px] px-2 flex flex-col items-center">
          <img src="/assets/graphics/no-device.svg" />
          <p className="text-center font-poppins text-lg font-semibold">
            No device has been added
          </p>
          <p className="text-center font-poppins text-black/60 mt-1 px-[10%]">
            Cannot add device as you have not been enrolled with an aggregator
          </p>
          <Button
            variant="default"
            disabled
            className="bg-white h-8 shadow px-8 flex gap-2 justify-center items-center font-poppins mt-6"
            onClick={() => setCurrentTab("add")}
          >
            <span className="text-white">Add Device</span>
            <PlusCircleIcon
              width={24}
              className="text-white"
              color="white"
              fill="white"
            />
          </Button>
          <p className="mt-10 text-blue-main text-center font-poppins">
            “From 1990 to 2019, the total warming effect from greenhouse gases
            added by humans to the Earth's atmosphere increased by 45
            percent. The warming effect associated with carbon dioxide alone
            increased by 36 percent.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default Devices;

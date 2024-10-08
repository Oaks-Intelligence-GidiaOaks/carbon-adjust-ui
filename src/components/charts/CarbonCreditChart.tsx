import { useState } from "react";
import { Button } from "@/components/ui";
import { cn } from "@/utils";

const CarbonCreditChart = () => {
  const [currentTab, setCurrentTab] = useState("history");

  const tabs = ["1M", "3M", "6M", "9M", "1Y", "All"];

  return (
    <div className="mt-10 h-[250px] border rounded-lg p-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-[16px] leading-[19.53px] font-medium font-poppins text-[#139EEC] px-2">
          Carbon Credit Overview
        </h1>
        <div className="flex justify-between flex-1">
          <Button
            variant={currentTab === "history" ? "default" : "outline"}
            onClick={() => setCurrentTab("history")}
            className={cn(
              "font-poppins font-normal h-[31px] hover:bg-gray-100",
              currentTab === "history" ? "text-white" : ""
            )}
          >
            History
          </Button>
          <div className="flex gap-x-2">
            {tabs.map((tab, i) => (
              <Button
                key={i}
                variant={currentTab === tab ? "default" : "outline"}
                onClick={() => setCurrentTab(tab)}
                className={cn(
                  "font-poppins font-normal h-[31px] hover:bg-gray-100 px-2",
                  currentTab === tab ? "text-white" : ""
                )}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonCreditChart;

import TabToggler from "@/components/containers/TabToggler";
import AdvertCard from "@/components/ui/AdvertCard";
import { useState } from "react";

type Props = {};

const Ads = (_: Props) => {
  const [activeTab, setActiveTab] = useState<string>("All");

  return (
    <div className="px-3 space-y-5">
      <h2>Adverts</h2>

      {/* Tab toggers */}
      <div className="md:w-3/4">
        <TabToggler
          activeTab={activeTab}
          onClick={(val) => setActiveTab(val)}
          tabs={["All", "Active", "Inactive"]}
        />
      </div>

      <div className="space-y-5">
        <div className="w-fit ml-auto">
          <button className="blue-gradient rounded-2xl text-white text-center py-2 px-[20px]">
            Create AD
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 9 }, (_, i) => (
            <AdvertCard
              key={i}
              setIsActive={() => {}}
              image="/ads/ads-01.svg"
              isActive
              text="Get the best traffic updates around you..."
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ads;

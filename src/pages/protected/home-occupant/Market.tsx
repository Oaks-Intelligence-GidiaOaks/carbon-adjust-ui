import DashboardBanner from "@/components/containers/DashboardBanner";
import Promotion from "@/components/containers/Promotion";
import BestSellers from "@/components/containers/home/BestSellers";
import EnergyEfficient from "@/components/containers/home/EnergyEfficient";
import EnergySaving from "@/components/containers/home/EnergySaving";
import HomeEnergy from "@/components/containers/home/HomeEnergy";
import HomeImprovement from "@/components/containers/home/HomeImprovement";
import Retrofit from "@/components/containers/home/Retrofit";

type Props = {};

// this is the Main Dashboard page for showing all products in different categries

const Market = (_: Props) => {
  return (
    <div>
      <DashboardBanner />
      <BestSellers />
      <Promotion />

      <div className="space-y-[38px] pt-[30px]">
        <HomeEnergy />
        <HomeImprovement />
        <EnergySaving />
        <Retrofit />
        <EnergyEfficient />
      </div>
    </div>
  );
};

export default Market;

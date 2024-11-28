import TabToggler from "@/components/containers/TabToggler";
import { IComponentMap } from "@/types/general";
import { TransportTabs } from "@/interfaces/transport.interface";
import Vehicles from "@/components/containers/transport/Vehicles";
import TransportHistory from "@/components/containers/transport/TransportHistory";
import { setTransportTab } from "@/features/assetSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";

const Transport = () => {
  const dispatch = useDispatch();
  const tabs: TransportTabs[] = [
    TransportTabs.Transport,
    TransportTabs.TravelHistory,
  ];
  const activeTab = useSelector(
    (state: RootState) => state.assets.transport.activeTab
  );

  const handleTabSwitch = (tab: any) => {
    dispatch(setTransportTab(tab));
  };

  const activeComponent: IComponentMap = {
    [TransportTabs.Transport]: <Vehicles />,
    [TransportTabs.TravelHistory]: <TransportHistory />,
  };

  return (
    <div className=" py-[20px] font-poppins">
      <div className="flex-center flex-wrap  gap-2 w-full sticky top-0 pb-3 bg-[#FAFDFF] z-[50]">
        <div className="md:w-4/5">
          <TabToggler
            activeTab={activeTab}
            onClick={handleTabSwitch}
            tabs={tabs}
            variant="underline"
          />
        </div>
      </div>

      <div className="mt-[15px]">{activeComponent[activeTab]}</div>
    </div>
  );
};

export default Transport;

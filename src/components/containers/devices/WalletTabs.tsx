import ComingSoon from "@/components/reusables/ComingSoon";
import WalletCard from "@/components/ui/WalletCard";
import { IComponentMap } from "@/types/general";
import { memo, useState } from "react";
import TabToggler from "../TabToggler";
import { useQuery } from "@tanstack/react-query";
import { getWalletBalance } from "@/services/adminService";
import Loading from "@/components/reusables/Loading";
import RestrictedWalletCard from "@/components/ui/RestrictedWalletCard";

type Props = {
  WalletTitle?: string;
};

const WalletTabs = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string>("Carbon-Credit wallet");

  const { data, isLoading } = useQuery({
    queryKey: ["wallet-balance"],
    queryFn: () => getWalletBalance(),
  });

  console.log(data, "data");

  const walletData = {
    actualBalance: data?.data?.actualBalance || 0,
    ledgerBalance: data?.data?.ledgerBalance || 0,
  };

  const getActiveComponent: IComponentMap = {
    "Carbon-Credit wallet": (
      <WalletCard
        {...walletData}
        organisation={props?.WalletTitle ?? "Admin"} />
    ),
    "Cash Wallet":  <RestrictedWalletCard />,
    "Coin Wallet": <ComingSoon height="h-[200px]" />,
  };

  if (isLoading) {
    return (
      <div className="grid place-items-center h-[132px]">
        <Loading message="" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="">
        <h2 className="text-[#333333] font-[600] text-[24px]">Wallet</h2>
        <p className="text-[#575757] text-base ">
          Manage your payments and transactions
        </p>
      </div>

      <div className="md:w-3/4 mt-5">
        <TabToggler
          activeTab={activeTab}
          onClick={setActiveTab}
          tabs={["Carbon-Credit wallet", "Cash Wallet", "Coin Wallet"]}
        />
      </div>

      <div className="mt-5">{getActiveComponent[activeTab]}</div>
    </div>
  );
};

export default memo(WalletTabs);

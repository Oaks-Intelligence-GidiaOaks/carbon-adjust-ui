// import ComingSoon from "@/components/reusables/ComingSoon";
import WalletCard from "@/components/ui/WalletCard";
import { IComponentMap } from "@/types/general";
import { memo, useState } from "react";
import TabToggler from "../TabToggler";
import { useQuery } from "@tanstack/react-query";
import { getWalletBalance } from "@/services/adminService";
import Loading from "@/components/reusables/Loading";
// import RestrictedWalletCard, {
//   CashWalletCard,
// } from "@/components/ui/RestrictedWalletCard";
import PointWallet from "@/components/ui/PointWallet";
import CashWallet from "../wallet/CashWallet";
import { WalletType } from "@/interfaces/transaction.interface";
import CarbonCreditWallet from "../wallet/CarbonCreditWallet";
import MerchantCashWallet from "../wallet/MerchantCashWallet";

type Props = {
  WalletTitle?: string;
};

const WalletTabs = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string>("Carbon-Credit wallet");

  const { data, isLoading } = useQuery({
    queryKey: ["wallet-balance"],
    queryFn: () => getWalletBalance(),
  });

  const walletData = {
    actualBalance: data?.data?.actualBalance || 0,
    ledgerBalance: data?.data?.ledgerBalance || 0,
  };

  const getActiveComponent: IComponentMap = {
    "Carbon-Credit wallet": (
      <WalletCard
        {...walletData}
        organisation={props?.WalletTitle ?? "Admin"}
      />
    ),
    "Cash Wallet": <CashWallet />,
    "Point Wallet": <PointWallet />,
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
          tabs={["Carbon-Credit wallet", "Cash Wallet", "Point Wallet"]}
        />
      </div>

      <div className="mt-5">{getActiveComponent[activeTab]}</div>
    </div>
  );
};

export const MerchantWalletTabs = memo(() => {
  const [activeTab, setActiveTab] = useState<WalletType | string>(
    WalletType.CARBON_CREDIT
  );

  const getActiveTab: IComponentMap = {
    [WalletType.CARBON_CREDIT]: <CarbonCreditWallet />,
    [WalletType.CASH_WALLET]: <MerchantCashWallet />,
    [WalletType.COIN_WALLET]: <PointWallet />,
  };

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
          tabs={[
            WalletType.CARBON_CREDIT,
            WalletType.CASH_WALLET,
            WalletType.COIN_WALLET,
          ]}
        />
      </div>

      <div className="mt-5">{getActiveTab[activeTab]}</div>
    </div>
  );
});

export default memo(WalletTabs);

import WalletCard from "@/components/ui/WalletCard";
import { IComponentMap } from "@/types/general";
import { Dispatch, memo, SetStateAction } from "react";
import TabToggler from "../TabToggler";
import { useQuery } from "@tanstack/react-query";
import { getWalletBalance } from "@/services/adminService";
import Loading from "@/components/reusables/Loading";
import PointWallet from "@/components/ui/PointWallet";
import CashWallet from "../wallet/CashWallet";
import { WalletType } from "@/interfaces/transaction.interface";
import CarbonCreditWallet from "../wallet/CarbonCreditWallet";
import MerchantCashWallet from "../wallet/MerchantCashWallet";

type Props = {
  WalletTitle?: string;
  activeTab: WalletType;
  setActiveTab: Dispatch<SetStateAction<WalletType>>;
};

const WalletTabs: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  WalletTitle,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["wallet-balance"],
    queryFn: () => getWalletBalance(),
  });

  const walletData = {
    actualBalance: data?.data?.actualBalance || 0,
    ledgerBalance: data?.data?.ledgerBalance || 0,
  };

  const getActiveComponent: IComponentMap = {
    [WalletType.CARBON_CREDIT]: (
      <WalletCard {...walletData} organisation={WalletTitle ?? "Admin"} />
    ),
    [WalletType.CASH_WALLET]: <CashWallet />,
    [WalletType.COIN_WALLET]: <PointWallet />,
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
          // @ts-ignore
          onClick={setActiveTab}
          tabs={[
            WalletType.CARBON_CREDIT,
            WalletType.CASH_WALLET,
            WalletType.COIN_WALLET,
          ]}
        />
      </div>

      <div className="mt-5">{getActiveComponent[activeTab]}</div>
    </div>
  );
};

export const MerchantWalletTabs: React.FC<Props> = memo(
  ({ activeTab, setActiveTab }) => {
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
            // @ts-ignore
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
  }
);

export default memo(WalletTabs);

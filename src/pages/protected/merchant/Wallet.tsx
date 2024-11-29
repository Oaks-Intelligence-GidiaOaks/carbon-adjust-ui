import { FC, useState } from "react";
import { TransactionsGrid } from "@/components/grid/merchant/TransactionsGrid";
import { MerchantWalletTabs } from "@/components/containers/devices/WalletTabs";
import { WalletType } from "@/interfaces/transaction.interface";

const Wallet: FC = () => {
  const [activeTab, setActiveTab] = useState<WalletType>(
    WalletType.CARBON_CREDIT
  );

  return (
    <div className="px-6 w-full">
      <div className="mt-10 w-full ">
        <MerchantWalletTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <TransactionsGrid
        walletType={activeTab}
        className="mt-8 max-w-[90vw] md:max-w-[60vw] lg:max-w-[70vw] xl:max-w-[75vw]"
      />
    </div>
  );
};

export default Wallet;

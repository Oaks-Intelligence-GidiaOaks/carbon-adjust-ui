import WalletTabs from "@/components/containers/devices/WalletTabs";
import { TransactionsGrid } from "@/components/grid/merchant/TransactionsGrid";
import { WalletType } from "@/interfaces/transaction.interface";
import { useState } from "react";

const Wallet = () => {
  const [activeTab, setActiveTab] = useState<WalletType>(
    WalletType.CARBON_CREDIT
  );

  return (
    <div className="p-6 bg-[#F9FCFD]">
      <WalletTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        WalletTitle={""}
      />

      <TransactionsGrid walletType={activeTab} className="mt-8 max-w-[90vw]" />
    </div>
  );
};

export default Wallet;

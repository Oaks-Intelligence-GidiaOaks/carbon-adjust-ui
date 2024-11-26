import { FC } from "react";
import { TransactionsGrid } from "@/components/grid/merchant/TransactionsGrid";
import { MerchantWalletTabs } from "@/components/containers/devices/WalletTabs";

const Wallet: FC = () => {
  return (
    <div className="px-6 w-full">
      <div className="mt-10 w-full ">
        <MerchantWalletTabs />
      </div>

      <TransactionsGrid className="mt-8 max-w-[90vw] md:max-w-[60vw] lg:max-w-[70vw] xl:max-w-[75vw]" />
    </div>
  );
};

export default Wallet;

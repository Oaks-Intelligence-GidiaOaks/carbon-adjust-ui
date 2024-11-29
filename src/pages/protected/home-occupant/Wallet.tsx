import WalletTabs from "@/components/containers/devices/WalletTabs";
import { TransactionsGrid } from "@/components/grid/merchant/TransactionsGrid";

const Wallet = () => {
  return (
    <div className="p-6 bg-[#F9FCFD]">
      <WalletTabs WalletTitle={""} />

      <TransactionsGrid className="mt-8 max-w-[90vw]" />
    </div>
  );
};

export default Wallet;

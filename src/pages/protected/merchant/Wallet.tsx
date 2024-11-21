import { FC } from "react";
// import RestrictedWalletCard from "@/components/ui/RestrictedWalletCard";
import MerchantCashWallet from "@/components/containers/wallet/MerchantCashWallet";

const Wallet: FC = () => {
  return (
    <div className="px-6">
      <p className="font-poppins text-2xl mt-10 text-blue-950">Wallet</p>
      <div className="flex items-center gap-10 mt-2">
        <h2 className="text-[#212121] leading-[19.53px] font-normal font-poppins text-[14px]">
          Manage your payments and transactions
        </h2>
      </div>

      <div className="mt-10 flex justify-between flex-wrap">
        <MerchantCashWallet />
        {/* <RestrictedWalletCard /> */}
      </div>
    </div>
  );
};

export default Wallet;

import { WalletBg } from "@/assets/images";

const WalletCard = () => {
  return (
    <div className=" max-w-[512px] rounded-[20px] bg-[#2C5C9F] px-8 py-8 text-white font-poppins relative overflow-hidden">
      <WalletBg className="absolute  w-full rounded-[20px] h-full -right-10 top-0 z-[5]" />

      <div className="z-[50] space-y-8 relative">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h2 className="text-[#DEDEDE] font-[400] ">Flux Enterprise</h2>
            <h4 className="text-[#F1F1F1] font-[500] text-sm">
              Carbon Credit Wallet
            </h4>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg text-[#DEDEDE] font-[400]">Total Off-set</h2>

            <h1 className="text-[#F1F1F1] text-[25.4px] font-[400] font-inter">
              532,789 tCO2e
            </h1>
          </div>
        </div>

        <div className="flex-center justify-between">
          <div className="flex flex-col gap-2">
            <h2 className="text-[#DEDEDE] font-[400]">Ledger Balance</h2>
            <h4>356,567 tCO2e</h4>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-[#DEDEDE] font-[400] text-sm">
              Projected Schedule
            </h2>

            <h1 className="font-[400]">34,678 tCO2e</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;

import { FC } from "react";
import { FaRegCreditCard } from "react-icons/fa";

interface CorporateWalletCardProps {
  organization: string;
  walletHolder: string;
  ledgerBalance: string;
  emissionScore: number;
  totalOffset: string;
}

const CorporateWalletCard: FC<CorporateWalletCardProps> = ({
  organization,
  walletHolder,
  ledgerBalance,
  emissionScore,
  totalOffset,
}) => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-[15.46px] overflow-hidden  max-w-md shadow-lg space-y-4 font-poppins text-sm">
      <div className="p-7 pt-10 space-y-4">
        {/* Top Row */}
        <div className="flex justify-between items-center text-sm">
          <div>
            <p className="font-[400]">Organization</p>
            <p className="font-inter font-[500] tracking-wide">
              {organization}
            </p>
          </div>
          <div>
            <p className="font-[400]">Carbon Credit Wallet</p>
            <p className="font-inter font-[500] tracking-wide">
              {walletHolder}
            </p>
          </div>
        </div>

        {/* Middle Row */}
        <div className="flex justify-between items-center">
          <div>
            <p className="font-[400]">Ledger Balance</p>
            <p className="text-xl font-inter font-[500] tracking-wide">
              {ledgerBalance}
            </p>
          </div>
          <div>
            <p className="font-[400]">Composite Emission Score</p>
            <p className="font-[600] text-xl text-right tracking-wide">
              {emissionScore}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="bg-[#1A237E] text-[#F1F1F1] rounded-b-lg p-4 px-7 shadow-md font-inter flex-center justify-between">
        <div className="flex flex-col gap-3">
          <p className="text-lg font-bold ">{totalOffset}</p>
          <p className="text-sm text-white">Total Off-set</p>
        </div>

        <button className="mt-4 hover:blue-gradient text-white py-2 text-xs px-4 rounded-xl border hover:border-none flex items-center space-x-2  font-poppins">
          <FaRegCreditCard />
          <span>Publish Score</span>
        </button>
      </div>
    </div>
  );
};

export default CorporateWalletCard;

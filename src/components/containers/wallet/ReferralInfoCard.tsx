import React from "react";
import { CiCircleAlert } from "react-icons/ci";
import { MdOutlineContentCopy } from "react-icons/md";

interface ReferralInfoCardProps {
  referralCode: string; // The referral code to display
  onCopy: () => void; // Callback for copying the referral code
  showCopied: boolean;
}

const ReferralInfoCard: React.FC<ReferralInfoCardProps> = ({
  referralCode,
  onCopy,
  showCopied,
}) => {
  return (
    <div className="p-4 text-xs flex-shrink bg-white flex-[0.6] md:flex-initial rounded-lg shadow-md border border-gray-200 ">
      {/* Referral Code Section */}
      <div className="mb-4 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2">
        <label className=" font-medium text-gray-700">Referral code:</label>

        <div className="mt-1 flex items-center justify-between  ">
          <span className=" text-gray-800 truncate text-[11px]">
            {referralCode}
          </span>
          <button
            onClick={onCopy}
            className="text-blue-500 hover:text-blue-700 transition-colors flex-center gap-1"
            aria-label="Copy referral code"
          >
            {showCopied && (
              <span className="text-[10px] tracking-tight ">Copied</span>
            )}
            {/* copy */}
            <MdOutlineContentCopy />
          </button>
        </div>
      </div>

      {/* Information Section */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex flex-col gap-2 mb-2">
          <CiCircleAlert />
          <h3 className="font-[500] text-gray-800">
            Coin Withdrawal Threshold:
          </h3>
        </div>
        <p className="text-[10px] text-gray-600">
          Please note that the minimum amount of coin that can be converted or
          withdrawn cannot be less than £50.
        </p>
      </div>
    </div>
  );
};

export default ReferralInfoCard;

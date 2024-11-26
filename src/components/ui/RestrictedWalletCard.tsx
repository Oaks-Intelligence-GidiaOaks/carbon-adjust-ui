import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getRestrictedWallet } from "@/services/homeOwner";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useState } from "react";
import { CiCircleAlert } from "react-icons/ci";
import { IoLockOpen } from "react-icons/io5";
import { WalletType } from "@/interfaces/transaction.interface";

const RestrictedWalletCard = () => {
  // Fetch wallet data using useQuery
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restricted-wallet"],
    queryFn: () => getRestrictedWallet(WalletType.CARBON_CREDIT),
  });

  if (isLoading) {
    return <p>Loading wallet data...</p>;
  }

  if (isError) {
    toast.error("Error fetching wallet data. Please try again later.");
    return <p>Error loading wallet data.</p>;
  }

  const walletData = data?.data;

  if (!walletData) {
    return <p>No wallet data available.</p>;
  }

  const { numberOfGrants, numberOfPackages, balance, grantUsed, name } =
    walletData;

  return (
    <div className="w-full max-w-[512px] rounded-[20px] bg-[url('@/assets/icons/res-card-bg.svg')] bg-cover bg-no-repeat text-white shadow-lg p-6 relative mx-auto sm:w-[512px] sm:mx-0">
      {/* Wallet Information */}
      <div className="flex justify-between mt-4">
        <div className="">
          <h2 className="text-sm font-poppins">Restricted wallet</h2>
          <p className="font-inter font-medium">{name}</p>
        </div>
        <div>
          <p className="text-xs font-poppins">Number of packages</p>
          <p className="text-base font-inter font-medium">{numberOfPackages}</p>
        </div>
      </div>

      {/* Grants and Grant Used Info */}
      <div className="flex justify-between mt-4">
        <div>
          <p className="text-base font-inter">Number of Grants</p>
          <p className="text-2xl font-semibold font-inter">{numberOfGrants}</p>
        </div>
        <div className="">
          <p className="text-base font-poppins">Grant used</p>
          <p className="font-semibold text-xl font-inter">
            ${Math.abs(grantUsed)}
          </p>{" "}
          {/* Convert negative to positive */}
        </div>
      </div>

      {/* Balance */}
      <div className="pt-14">
        <p className="text-sm">Balance</p>
        <p className="text-3xl font-bold">${balance}</p>
      </div>
    </div>
  );
};

interface CashWalletCardProps {
  name: string; // Name of the wallet owner
  walletId: string; // Wallet ID
  totalCWB?: string; // Total CWB amount
  grantCredit?: string; // Grant credit amount
  rcwb?: string;
  ucwb?: string;
  type: "total" | "rcwb";
  onTransfer?: () => void;
}

export const CashWalletCard: React.FC<CashWalletCardProps> = ({
  name,
  walletId,
  totalCWB,
  type = "total",
  rcwb,
  ucwb,
  grantCredit,
  onTransfer,
}) => {
  const [balanceHidden, setBalanceHidden] = useState<boolean>(false);

  const hideBalance = () => {
    setBalanceHidden(!balanceHidden);
  };

  return (
    <div
      style={{
        background:
          type === "total"
            ? `url('/assets/graphics/cash-wallet-bg-01.svg')`
            : `url('/assets/graphics/cash-wallet-bg-02.svg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-[310px] md:w-[450px] shrink-0 h-auto p-6 rounded-[16px] shadow-lg bg text-white relative overflow-hidden text-xs font-inter"
    >
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <div>
          <p className="md:text-sm font-light">Cash Wallet</p>
          <p className="text-sm md:text-base">{name}</p>
        </div>

        <div className="text-right">
          <p className="md:text-sm font-light">Wallet ID</p>
          <p className="text-xs md:text-sm  max-w-32 md:max-w-52 truncate">
            {walletId}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] opacity-20 my-[30px]"></div>

      {/* Bottom Section */}
      <div
        className={`flex justify-between items-center ${
          type === "total" && "pt-5"
        }`}
      >
        <div>
          {type === "rcwb" && (
            <div className="flex-center gap-1">
              <div className="flex-center gap-1">
                <CiCircleAlert /> <span>RCWB</span>
              </div>

              <div className="bg-[#3495FF] bg-opacity-60 w-6 h-6 grid place-items-center rounded-full">
                <IoLockOpen />
              </div>
            </div>
          )}

          <p className="text-xl md:text-2xl flex items-center">
            {balanceHidden ? "*********" : totalCWB || rcwb}

            {type === "total" && (
              <span
                className="ml-2 text-lg md:text-xl cursor-pointer"
                onClick={hideBalance}
              >
                <MdOutlineRemoveRedEye />
              </span>
            )}
          </p>

          {type === "total" && (
            <p className="text-xs md:text-sm font-light">Total CWB</p>
          )}
        </div>

        <div className="text-right">
          {type === "rcwb" && (
            <div className="flex-center gap-1">
              <div className="flex-center gap-1">
                <CiCircleAlert /> <span>UCWB</span>
              </div>

              <div className="bg-[#3495FF] bg-opacity-60 w-6 h-6 rounded-full grid place-items-center">
                <IoLockOpen />
              </div>
            </div>
          )}

          <p className="text-xl md:text-2xl">{grantCredit || ucwb}</p>

          {type === "total" && (
            <p className="text-xs md:text-sm font-light"> Grant Credit</p>
          )}
        </div>
      </div>

      {/* action buttons */}

      {type === "rcwb" && (
        <div className="flex-center gap-2 pt-1 justify-center">
          <button
            onClick={onTransfer}
            className="text-white rounded-2xl px-6 py-2 bg-[#139EEC]"
          >
            Transfer
          </button>

          {/* <button className="text-white rounded-2xl border border-white px-6 py-2">
            Withdraw
          </button> */}
        </div>
      )}

      {/* Background Pattern */}
      {/* <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -translate-y-6 translate-x-6"></div> */}
    </div>
  );
};

export const CashWalletCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-[#e8e8e87b] h-48 flex flex-col justify-between w-[310px] md:w-[450px] p-6 rounded-[24px]">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="h-4 w-24 bg-gray-300 rounded"></div> {/* Wallet Type */}
        <div className="h-4 w-36 bg-gray-300 rounded"></div> {/* Wallet ID */}
      </div>
      {/* Name Section */}
      <div className="h-4 w-32 bg-gray-300 rounded mt-2"></div> {/* Name */}
      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-300 my-2"></div>
      {/* Bottom Section */}
      <div className="flex justify-between items-center">
        <div>
          <div className="h-6 w-8 bg-gray-300 rounded"></div> {/* Icon */}
          <div className="h-4 w-16 bg-gray-300 rounded mt-1"></div>{" "}
          {/* Total CWB */}
        </div>
        <div>
          <div className="h-4 w-12 bg-gray-300 rounded"></div>
          {/* Grant Credit */}
        </div>
      </div>
    </div>
  );
};

export default RestrictedWalletCard;

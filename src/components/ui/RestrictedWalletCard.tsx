import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getRestrictedWallet } from "@/services/homeOwner"; 

const RestrictedWalletCard = () => {
  // Fetch wallet data using useQuery
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restricted-wallet"],
    queryFn: () => getRestrictedWallet(),
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

  const { numberOfGrants, numberOfPackages, balance, grantUsed } = walletData;

  return (
    <div className="w-full max-w-[512px] rounded-[20px] bg-[url('@/assets/icons/res-card-bg.svg')] bg-cover bg-no-repeat text-white shadow-lg p-6 relative mx-auto sm:w-[512px] sm:mx-0">
      {/* Wallet Information */}
      <div className="flex justify-between mt-4">
        <div className="">
          <h2 className="text-sm font-poppins">Restricted wallet</h2>
          <p className="font-inter font-medium">Emmanuel Otunoye</p>
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

export default RestrictedWalletCard;

const RestrictedWalletCard = () => {
    return (
      <div className="w-full max-w-[512px] rounded-[20px] bg-[url('@/assets/icons/res-card-bg.svg')] bg-cover bg-no-repeat text-white shadow-lg p-6 relative mx-auto sm:w-[512px] sm:mx-0">
        {/* Wallet Information */}
        <div className="flex justify-between mt-4">
          <div className="">
            <h2 className="text-sm font-poppins">Restricted wallet</h2>
            <p className="font-inter font-medium">Danny Walters</p>
          </div>
          <div>
            <p className="text-xs font-poppins">Number of packages</p>
            <p className="text-base font-inter font-medium">4</p>
          </div>
        </div>
  
        {/* Grants and Grant Used Info */}
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-base font-inter">Number of Grants</p>
            <p className="text-2xl font-semibold font-inter">5</p>
          </div>
          <div className="">
            <p className="text-base font-poppins">Grant used</p>
            <p className="font-semibold text-xl font-inter">$12,789</p>
          </div>
        </div>
  
        {/* Balance */}
        <div className="pt-14">
          <p className="text-sm">Balance</p>
          <p className="text-3xl font-bold">$532,789</p>
        </div>
      </div>
    );
  };
  
  export default RestrictedWalletCard;
  
import React from "react";

interface NetworkBannerProps {
  isOnline: boolean;
}

const NetworkBanner: React.FC<NetworkBannerProps> = ({ isOnline }) => {
  if (isOnline) return null;

  return (
    <div className="fixed top-0 w-full bg-slate-900 text-white text-center py-2">
      No Internet Connection
    </div>
  );
};

export default NetworkBanner;

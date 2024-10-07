import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { UserRole } from "@/interfaces/user.interface";

import SuperMerchantPackages from "@/components/containers/merchant/SuperMerchantPackages";
import RegularPackages from "@/components/containers/merchant/RegularPackages";

type Props = {};

const Packages = (_: Props) => {
  const { user } = useSelector((state: RootState) => state.user);

  if (user?.roles.includes(UserRole.SUPER_MERCHANT)) {
    return <SuperMerchantPackages />;
  }

  return <RegularPackages />;
};

export default Packages;

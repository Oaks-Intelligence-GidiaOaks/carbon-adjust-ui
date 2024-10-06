import { RootState } from "@/app/store";
import { UserRole } from "@/interfaces/user.interface";
import { useSelector } from "react-redux";
import MerchantClaims from "@/components/containers/merchant/MerchantClaims";
import SuperMerchantClaims from "@/components/containers/merchant/SuperMerchantClaims";

const Claims = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const isSuperMerchant = user?.roles.includes(UserRole.SUPER_MERCHANT);

  if (isSuperMerchant) {
    return <SuperMerchantClaims />;
  }

  return <MerchantClaims />;
};

export default Claims;

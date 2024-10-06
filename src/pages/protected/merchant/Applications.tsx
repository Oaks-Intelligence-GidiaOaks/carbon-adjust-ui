import { RootState } from "@/app/store";
import RegularApplications from "@/components/containers/merchant/RegularApplications";
import SuperMerchantApplications from "@/components/containers/merchant/SuperMerchantApplications";
import { UserRole } from "@/interfaces/user.interface";
import { useSelector } from "react-redux";

type Props = {};

const Applications = (_: Props) => {
  const { user } = useSelector((state: RootState) => state.user);

  if (user?.roles.includes(UserRole.SUPER_MERCHANT)) {
    return <SuperMerchantApplications />;
  }

  return <RegularApplications />;
};

export default Applications;

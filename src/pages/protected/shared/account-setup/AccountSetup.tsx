import { useSelector } from "react-redux";
// import HomeOwnerAccountSetup from "./accounts/HomeOwnerAccountSetup";
import { RootState } from "@/app/store";
import MerchantAccountSetup from "./accounts/MerchantAccountSetup";

type Props = {};

const AccountSetup = (_: Props) => {
  const userData = useSelector((state: RootState) => state.user.user);

  console.log(userData?.roles[0]);

  switch (userData?.roles[0]) {
    case "MERCHANT":
      return <MerchantAccountSetup />;
    default:
      return <MerchantAccountSetup />;
    // break;
  }
  return <></>;
};

export default AccountSetup;

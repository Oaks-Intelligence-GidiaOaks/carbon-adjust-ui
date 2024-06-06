import { useSelector } from "react-redux";
// import HomeOwnerAccountSetup from "./accounts/HomeOwnerAccountSetup";
import { RootState } from "@/app/store";
// import AggregatorAccountSetup from "./accounts/AggregatorAccountSetup";
import MerchantAccountSetup from "./accounts/MerchantAccountSetup";

type Props = {};

const AccountSetup = (_: Props) => {
  const userData = useSelector((state: RootState) => state.user.user);

  console.log(userData?.roles[0]);

  switch (userData?.roles[0]) {
    // case "HOME_OCCUPANT":
    //   return <HomeOwnerAccountSetup />;
    case "MERCHANT":
      return <MerchantAccountSetup />;
    // case "AGGREGATOR":
    //   return <AggregatorAccountSetup />;
    // case "HIA":
    //   return <AggregatorAccountSetup />;
    // case "FINANCIAL_INSTITUTION":
    //   return <AggregatorAccountSetup />;
    // case "INSURANCE":
    //   return <AggregatorAccountSetup />;
    // case "SUBCONTRACTOR":
    // return <AggregatorAccountSetup />;
    default:
      return <MerchantAccountSetup />;
    // break;
  }
  return <></>;
};

export default AccountSetup;

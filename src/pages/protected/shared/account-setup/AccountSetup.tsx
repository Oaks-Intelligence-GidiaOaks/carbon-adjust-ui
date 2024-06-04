import { useSelector } from "react-redux";
import HomeOwnerAccountSetup from "./accounts/HomeOwnerAccountSetup";
import { RootState } from "@/app/store";
import AggregatorAccountSetup from "./accounts/AggregatorAccountSetup";

type Props = {};

const AccountSetup = (_: Props) => {
  const userData = useSelector((state: RootState) => state.user.user);

  console.log(userData?.roles[0]);

  switch (userData?.roles[0]) {
    case "HOME_OCCUPANT":
      return <HomeOwnerAccountSetup />;
    case "AGGREGATOR":
      return <AggregatorAccountSetup />;
    case "HIA":
      return <AggregatorAccountSetup />;
    case "FINANCIAL_INSTITUTION":
      return <AggregatorAccountSetup />;
    case "INSURANCE":
      return <AggregatorAccountSetup />;
    case "SUBCONTRACTOR":
      return <AggregatorAccountSetup />;
    default:
      break;
  }
  return <></>;
};

export default AccountSetup;

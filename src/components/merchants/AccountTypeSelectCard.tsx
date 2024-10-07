import { AccountType } from "@/interfaces/user.interface";
import { IComponentNestedMap } from "@/types/general";
import {
  AccountTypeIcon1,
  AccountTypeIcon2,
  AccountTypeIcon3,
} from "../../assets/icons";

const AccountTypeSelectCard = (props: { type: AccountType }) => {
  const detailsMap: IComponentNestedMap = {
    [AccountType.PUBLIC_LIMITED_COMPANY]: {
      component: <AccountTypeIcon1 />,
      header: "Public Limited Company",
      lead: "Are you self employed with your own business?",
    },

    [AccountType.PRIVATE_LIMITED_COMPANY]: {
      component: <AccountTypeIcon2 />,
      header: "Public Limited Company",
      lead: "Are you A local authority? ",
    },

    [AccountType.GOVERNMENT_ENTITY]: {
      component: <AccountTypeIcon3 />,
      header: "Government Entity",
      lead: "Are you self employed with your own business and have a licence?",
    },
  };

  return (
    <div className="border h-[289px] bg-white shadow-md px-6 flex flex-col justify-center items-center gap-1 text-center max-w-[250px] shrink-0 cursor-pointer">
      {detailsMap[props.type]?.component}

      <h4 className="font-[500] text-base tracking-tight text-[#141516]">
        {detailsMap[props.type]?.header}
      </h4>

      <p className="text-[#575757] text-sm font-[400]">
        {detailsMap[props.type]?.lead}
      </p>
    </div>
  );
};

export default AccountTypeSelectCard;

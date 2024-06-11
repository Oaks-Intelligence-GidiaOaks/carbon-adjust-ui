// import React from "react";

import AllUserRegistrations from "@/components/containers/AllUserRegistrations";
import HomeOwnerRegistrations from "@/components/containers/HomeOwnerRegistrations";
import MerchantRegistrations from "@/components/containers/MerchantRegistrations";
import TabToggler from "@/components/containers/TabToggler";
import { fetchUsersRegistration } from "@/services/adminService";
import { IComponentMap } from "@/types/general";
import { transformAdminUserRegistrations } from "@/utils/reshape";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Props = {};

const AccountManagement = (_: Props) => {
  const tabs = ["All", "Home owners", "Merchants"];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  // const queryClient = useQueryClient();

  const {
    data: allUsers,
    isSuccess: userSuccess,
    // isLoading:,
    // isError,
  } = useQuery({
    queryKey: ["users-registration", activeTab],
    queryFn: () => fetchUsersRegistration(""),
  });

  const users = userSuccess
    ? transformAdminUserRegistrations(allUsers?.data.users)
    : [];

  console.log(users);

  const activeComponent: IComponentMap = {
    All: <AllUserRegistrations data={users} />,
    "Home owners": <HomeOwnerRegistrations />,
    Merchants: <MerchantRegistrations />,
  };

  return (
    <div>
      <div className="lg:w-2/3 mt-3">
        <TabToggler activeTab={activeTab} onClick={setActiveTab} tabs={tabs} />
      </div>

      <div>{activeComponent[activeTab]}</div>
    </div>
  );
};

export default AccountManagement;

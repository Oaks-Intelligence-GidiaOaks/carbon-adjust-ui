import AllUserRegistrations from "@/components/containers/AllUserRegistrations";
// import HomeOwnerRegistrations from "@/components/containers/HomeOwnerRegistrations";
// import MerchantRegistrations from "@/components/containers/MerchantRegistrations";
import TabToggler from "@/components/containers/TabToggler";
import TableSkeleton from "@/components/ui/TableSkeleton";
import { fetchUsersRegistration } from "@/services/adminService";
import { IComponentMap } from "@/types/general";
import { transformAdminUserRegistrations } from "@/utils/reshape";
import { useQuery } from "@tanstack/react-query";
import { memo, useEffect, useMemo, useState } from "react";

type Props = {};

const AccountManagement = (_: Props) => {
  const tabs = ["ALL", "HOME_OCCUPANT", "MERCHANT", "CORPORATE_USER_ADMIN"];

  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  // const [params, setParams] = useState({
  //   accountType: activeTab,
  //   page: 1,
  //   limit: 50,
  // });

  const params = useMemo(
    () => ({
      accountType: activeTab,
      page: 1,
      limit: 400,
    }),
    [activeTab]
  );

  const [tableLoading, setTableLoading] = useState<boolean>(false);

  const {
    data: allUsers,
    isSuccess: userSuccess,
    isLoading: usersLoading,
    refetch,
    isFetching: isFetchingLogs,
  } = useQuery({
    queryKey: ["users-registration", activeTab],
    queryFn: () => fetchUsersRegistration(params),
    // @ts-ignore
    onSettled: () => setTableLoading(false),
  });

  const users = userSuccess
    ? transformAdminUserRegistrations(allUsers?.data.users)
    : [];

  useEffect(() => {
    setTableLoading(isFetchingLogs);
  }, [isFetchingLogs]);

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  const activeComponent: IComponentMap = {
    ALL: <AllUserRegistrations data={users} tableHeader="All Users" />,
    HOME_OCCUPANT: (
      <AllUserRegistrations data={users} tableHeader="Home Owners" />
    ),
    MERCHANT: <AllUserRegistrations data={users} tableHeader="Merchants" />,
    CORPORATE_USER_ADMIN: (
      <AllUserRegistrations
        data={users}
        tableHeader="Non Financial Merchants"
      />
    ),
  };

  const handleChangeTab = (text: string) => {
    setActiveTab(text);
  };

  return (
    <div className="px-3 md:px-5">
      <div className=" lg:min-w-[90%] xl:min-w-[78%] w-fit mt-3">
        <TabToggler
          activeTab={activeTab}
          onClick={handleChangeTab}
          tabs={tabs}
        />
      </div>

      <div>
        {tableLoading || usersLoading ? (
          <div className="h-full w-full">
            <TableSkeleton />
          </div>
        ) : users.length > 0 ? (
          activeComponent[activeTab]
        ) : (
          <div className="text-base h-[250px] grid w-full place-items-center">
            <p>No Data Available...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(AccountManagement);

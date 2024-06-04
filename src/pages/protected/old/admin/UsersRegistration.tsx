// import React from "react";

// import TabToggler from "@/components/containers/TabToggler";
// import { Grid } from "@/components/grid";
// import { IComponentMap } from "@/types/general";
import { useState } from "react";
// import agg_app from "../../../dummy/agg_app.json";
// import assigned_app from "../../../dummy/assigned_app.json";
import { useQuery } from "@tanstack/react-query";
import { fetchUsersRegistration } from "@/services/adminService";
import {
  // accountTypes,
  aggregatorTypes,
  userRegistrationAccountTypes,
} from "@/constants";
import { Dropdown } from "@/components/ui";
import { cn } from "@/utils";
// import PlaceholderActionCard from "@/components/reusables/PlaceholderActionCard";
// import axiosInstance from "@/api/axiosInstance";
// import toast from "react-hot-toast";
// import { Oval } from "react-loader-spinner";
import AdminAggregatorRegistrationGrid from "@/components/grid/CollapsibleGrid";

const UsersRegistration = () => {
  // const queryClient = useQueryClient();
  // const adminTabs = [
  //   "HIA",
  //   "Financial Institutions",
  //   "Home Occupants/Owners",
  //   "Aggregators",
  // ];

  // const [activeTab, setActiveTab] = useState<string>(adminTabs[0]);
  const [aggFilterFormState, setAggFilterFormState] = useState({
    aggregatorType: { label: "Local Authority", value: "LOCAL_AUTHORITY" },
  });

  const [currentTab, setCurrentTab] = useState("HIA");

  // const getCurrentTData: IComponentMap = {
  //   HIA: <Grid data={agg_app} pageSize={20} tableStyles="" />,
  //   "Financial Institutions": (
  //     <Grid data={assigned_app} pageSize={20} tableStyles="" />
  //   ),
  //   "Home Occupants/Owners": (
  //     <Grid data={assigned_app} pageSize={20} tableStyles="" />
  //   ),
  //   Aggregators: <Grid data={assigned_app} pageSize={20} tableStyles="" />,
  // };

  // const approvedMutation = useMutation({
  //   mutationKey: ["approve-user"],
  //   mutationFn: (id: string) =>
  //     axiosInstance.patch(`/users/review/profile`, {
  //       userId: id,
  //       status: "confirmed",
  //     }),
  //   onSuccess: () => {
  //     toast.success("User verified succesfully");
  //     queryClient.invalidateQueries({ queryKey: ["users-registration"] });
  //   },
  //   onError: () => {
  //     toast.error("Error verifying user");
  //   },
  // });

  const userRegistrations = useQuery({
    queryKey: ["users-registration", currentTab],
    queryFn: () => fetchUsersRegistration(currentTab),
  });

  console.log(userRegistrations.data?.data.data.users);

  console.log(userRegistrations.data?.data);

  //   const registrationData = useQuery({
  //     queryKey: ["fetch-registration", activeTab],
  //     queryFn: () => fetchUserRegistration(activeTab)
  //   })

  return (
    <div className="">
      <div className="flex-center justify-between mb-4">
        <h2 className="page-header">Users Registration</h2>

        {/* <Link to={`/finance/staff/add`}>
          <Button className="flex-center gap-2">
            <span className="text-white">Add staff</span>
            <img
              src="/assets/icons/plus-circle.svg"
              className="h-6 w-6"
              alt="carbon-adjust icon"
            />
          </Button>
        </Link> */}
      </div>

      {/* toggler */}
      <div className="mb-4 overflow-x-auto max-h-16">
        <div className="w-0 overflow-visible max-h-16">
          <div className="border h-[56px] bg-[#F2F4F7] flex-center w-fit py-[6px] px-[17px] rounded-lg gap-2 ">
            <Dropdown
              name="AggregatorType"
              addPortal
              labelClassName="m-0 h-0 overflow-hidden"
              optionClassName="font-poppins text-black-main"
              optionsContainerClassName="-translate-y-8"
              options={aggregatorTypes}
              wrapperClassName={cn(
                "bg-gray-100 w-full h-[56px] font-poppins text-[#667085] font-[500] text-sm min-w-[237px] h-full text-center grid place-items-center rounded-[6px] cursor-pointer",
                [
                  "LOCAL_AUTHORITY",
                  "HOUSING_ASSOCIATION",
                  "PROPERTY_DEVELOPER",
                  "OTHERS",
                ].includes(currentTab) &&
                  "bg-white text-[#344054] drop-shadow-sm"
              )}
              placeholder=""
              // loadingText="Searching for aggregators"
              value={aggFilterFormState!.aggregatorType}
              onOptionChange={(value) => {
                setCurrentTab(value.value);
                setAggFilterFormState!((prev) => ({
                  ...prev,
                  aggregatorType: value,
                }));
              }}
            />
            {userRegistrationAccountTypes.map((item, i) => (
              <Tab
                onClick={() => setCurrentTab(item.value)}
                isActive={currentTab === item.value}
                text={item.label}
                key={i}
              />
            ))}
          </div>
        </div>
      </div>

      {/* table */}
      {/* <div>{getCurrentTData[activeTab]}</div> */}
      <div>{/* <DataTable columns={columns} data={data} /> */}</div>

      {userRegistrations.isSuccess &&
        userRegistrations.data?.data.data.users.length > 1 && (
          // userRegistrations.data?.data.data.users.map((hs: any, i: number) => (
          //   <PlaceholderActionCard key={i}>
          //     <p>Name: {hs.name}</p>
          //     <p>Email: {hs.email}</p>
          //     <p>Status: {hs.status}</p>
          //     {/* <p>
          //             Specializations:{" "}
          //             {hs.specializations.map((item: any, i: number) => (
          //               <span key={i}>{item.name}</span>
          //             ))}
          //           </p> */}
          //     {hs.status === "pending" && (
          //       <div className="mt-4 flex flex-col gap-3">
          //         {/* <Button
          //                 variant={"ghost"}
          //                 onClick={() => declineMutation.mutate(hs._id)}
          //                 disabled={declineMutation.isPending}
          //                 className="bg-red-500 w-full text-white"
          //               >
          //                 {declineMutation.isPending ? (
          //                   <Oval
          //                     visible={declineMutation.isPending}
          //                     height="20"
          //                     width="20"
          //                     color="#ffffff"
          //                     ariaLabel="oval-loading"
          //                     wrapperStyle={{}}
          //                     wrapperClass=""
          //                   />
          //                 ) : (
          //                   <span>Decline</span>
          //                 )}
          //               </Button> */}
          //         <Button
          //           variant={"ghost"}
          //           disabled={approvedMutation.isPending}
          //           onClick={() => approvedMutation.mutate(hs._id)}
          //           className="bg-green-500 w-full text-white"
          //         >
          //           {approvedMutation.isPending ? (
          //             <Oval
          //               visible={approvedMutation.isPending}
          //               height="20"
          //               width="20"
          //               color="#ffffff"
          //               ariaLabel="oval-loading"
          //               wrapperStyle={{}}
          //               wrapperClass=""
          //             />
          //           ) : (
          //             <span>Approve</span>
          //           )}
          //         </Button>
          //       </div>
          //     )}
          //   </PlaceholderActionCard>
          // ))
          <AdminAggregatorRegistrationGrid
            isUpdating={
              userRegistrations.isLoading || userRegistrations.isFetching
            }
            data={userRegistrations.data?.data.data.users}
          />
        )}
    </div>
  );
};

const Tab = ({
  isActive,
  text,
  onClick,
}: {
  isActive: boolean;
  text: string;
  onClick: () => void;
}) => {
  const activeStyle = "bg-white text-[#344054] drop-shadow-sm  ";

  return (
    <div
      onClick={() => onClick()}
      className={`${
        isActive ? activeStyle : " text-[#667085] "
      } font-[500] text-sm  min-w-[237px] h-full text-center grid place-items-center rounded-[6px] cursor-pointer font-poppins`}
    >
      <span>{text}</span>
    </div>
  );
};

export default UsersRegistration;

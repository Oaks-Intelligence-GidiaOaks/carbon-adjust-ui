// import React from "react";

import TabToggler from "@/components/containers/TabToggler";
// import { Grid } from "@/components/grid";
// import { Button } from "@/components/ui";
// import { IComponentMap } from "@/types/general";
import { useState } from "react";
// import { Link } from "react-router-dom";
// import agg_app from "../../../dummy/agg_app.json";
// import assigned_app from "../../../dummy/assigned_app.json";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
// import toast from "react-hot-toast";
// import PlaceholderActionCard from "@/components/reusables/PlaceholderActionCard";
// import { Oval } from "react-loader-spinner";
import HIAApplicationsGrid from "@/components/grid/HIAApplicationsGrid";

const Applications = () => {
  const databaseTabs = ["All Applications", "Assigned Applications"];

  const [activeTab, setActiveTab] = useState<string>(databaseTabs[0]);

  // const getCurrentTData: IComponentMap = {
  //   "All Applications": <Grid data={agg_app} pageSize={20} tableStyles="" />,
  //   "Assigned Applications": (
  //     <Grid data={assigned_app} pageSize={20} tableStyles="" />
  //   ),
  // };

  const hiaApplications = useQuery({
    queryKey: ["get-hia-applications"],
    queryFn: () => axiosInstance.get(`/applications/hia`),
  });
  console.log(hiaApplications.data?.data.data.applications);

  return (
    <div className="">
      <div className="flex-center justify-between mb-9">
        <h2 className="page-header">Database</h2>

        {/* <Link to={`/hia/staff/add`}>
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
      <div className="mb-4">
        <TabToggler
          tabs={databaseTabs}
          activeTab={activeTab}
          onClick={setActiveTab}
        />
      </div>

      {/* table */}
      {/* <div>{getCurrentTData[activeTab]}</div> */}
      <div className="flex gap-4 flex-wrap">
        {hiaApplications.isSuccess &&
          hiaApplications.data?.data.data.applications.length >= 1 && (
            <HIAApplicationsGrid
              data={hiaApplications.data?.data.data.applications}
              isUpdating={hiaApplications.isLoading}
            />
            // hiaApplications.data?.data.data.applications.map(
            //   (app: any, i: number) => <HIAAppCard app={app} key={i} />)
          )}
      </div>
    </div>
  );
};

// const HIAAppCard = ({ app }: { app: any }) => {
//   const queryClient = useQueryClient();

//   const [file, setFile] = useState<File | null>();

//   // const handleSubmit = (type: string) => {};

//   const declineMutation = useMutation({
//     mutationKey: ["decline application"],
//     mutationFn: (ids: { appId: string; packageId: string }) => {
//       const formData = new FormData();

//       if (!file) {
//         toast.error("Attach document");
//       }
//       if (file) {
//         formData.append("file", file);
//       }
//       formData.append("status", "false");
//       formData.append("packageId", ids.packageId);

//       return axiosInstance.patch(
//         `applications/${ids.appId}/hia/review`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//     },
//     onSuccess: () => {
//       toast.success("Application declined");
//       queryClient.invalidateQueries({
//         queryKey: ["get-hia-applications"],
//       });
//     },
//     onError: () => {
//       toast.error("Error approving contractor");
//     },
//   });

//   const approvedMutation = useMutation({
//     mutationKey: ["approve application"],
//     mutationFn: (ids: { appId: string; packageId: string }) => {
//       const formData = new FormData();

//       if (!file) {
//         toast.error("Attach document");
//       }
//       if (file) {
//         formData.append("file", file);
//       }
//       formData.append("status", "true");
//       formData.append("packageId", ids.packageId);

//       return axiosInstance.patch(
//         `applications/${ids.appId}/hia/review`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//     },
//     onSuccess: () => {
//       toast.success("Application approved");
//       queryClient.invalidateQueries({
//         queryKey: ["get-hia-applications"],
//       });
//     },
//     onError: () => {
//       toast.error("Error approving application");
//     },
//   });

//   return (
//     <PlaceholderActionCard>
//       <p>APP Ref: {app.appRef}</p>
//       <p>APP ID: {app.appId}</p>
//       <p>Package ID: {app.packageId}</p>
//       {/* <p>Email: {app.statuses.state}</p> */}
//       <p>Status: {app.currentStatus}</p>
//       <p>Package Name: {app.packageName}</p>

//       <input
//         type="file"
//         name="image"
//         id="image"
//         onChange={(e) => {
//           if (e.target.files) {
//             setFile(e.target.files[0]);
//           }
//         }}
//       />

//       {app.currentStatus !== "APPLIED" && (
//         <div className="mt-4 flex flex-col gap-3">
//           <label htmlFor="image">
//             <Button
//               variant={"ghost"}
//               onClick={() =>
//                 declineMutation.mutate({
//                   appId: app.appId,
//                   packageId: app.packageId,
//                 })
//               }
//               disabled={declineMutation.isPending || file === null}
//               className="bg-red-500 w-full text-white"
//             >
//               {declineMutation.isPending ? (
//                 <Oval
//                   visible={declineMutation.isPending}
//                   height="20"
//                   width="20"
//                   color="#ffffff"
//                   ariaLabel="oval-loading"
//                   wrapperStyle={{}}
//                   wrapperClass=""
//                 />
//               ) : (
//                 <span>Decline</span>
//               )}
//             </Button>
//           </label>
//           <label htmlFor="image">
//             <Button
//               variant={"ghost"}
//               disabled={approvedMutation.isPending}
//               onClick={() =>
//                 approvedMutation.mutate({
//                   appId: app.appId,
//                   packageId: app.packageId,
//                 })
//               }
//               className="bg-green-500 w-full text-white"
//             >
//               {approvedMutation.isPending ? (
//                 <Oval
//                   visible={approvedMutation.isPending || file === null}
//                   height="20"
//                   width="20"
//                   color="#ffffff"
//                   ariaLabel="oval-loading"
//                   wrapperStyle={{}}
//                   wrapperClass=""
//                 />
//               ) : (
//                 <span>Approve</span>
//               )}
//             </Button>
//           </label>
//         </div>
//       )}
//     </PlaceholderActionCard>
//   );
// };

export default Applications;

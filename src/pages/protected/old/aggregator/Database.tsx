import { FC, useState } from "react";
import TabToggler from "@/components/containers/TabToggler";
// import { Grid } from "@/components/grid";
import { Button } from "@/components/ui";
// import assigned_app from "../../../dummy/assigned_app.json";
// import { IComponentMap } from "@/types/general";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
// import PlaceholderActionCard from "@/components/reusables/PlaceholderActionCard";
// import toast from "react-hot-toast";
// import { Oval } from "react-loader-spinner";
import AggregatorDatabaseGrid from "@/components/grid/AggregatorDatabaseGrid";

const Database: FC = () => {
  const databaseTabs = ["All Applications", "Assigned Applications"];

  // const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<string>(databaseTabs[0]);

  const aggApplications = useQuery({
    queryKey: ["get-applications"],
    queryFn: () => axiosInstance.get(`/applications/aggregator`),
  });

  // const declineMutation = useMutation({
  //   mutationKey: ["decline contractor"],
  //   mutationFn: (id: string) =>
  //     axiosInstance.patch(`applications/${id}/aggregator/review`),
  //   onSuccess: () => {
  //     toast.success("Application declined");
  //     queryClient.invalidateQueries({ queryKey: ["get-applications"] });
  //   },
  //   onError: () => {
  //     toast.error("Error approving contractor");
  //   },
  // });

  // const approvedMutation = useMutation({
  //   mutationKey: ["decline contractor"],
  //   mutationFn: (id: string) =>
  //     axiosInstance.patch(`applications/${id}/aggregator/review`),
  //   onSuccess: () => {
  //     toast.success("Application approved");
  //     queryClient.invalidateQueries({ queryKey: ["get-applications"] });
  //   },
  //   onError: () => {
  //     toast.error("Error approving application");
  //   },
  // });

  console.log(aggApplications.data?.data);

  // const getCurrentTData: IComponentMap = {
  //   "All Applications": (
  //     <Grid
  //       type={"agg_app"}
  //       data={aggApplications.data?.data.data.applications ?? []}
  //       pageSize={20}
  //       tableStyles=""
  //     />
  //   ),
  //   "Assigned Applications": (
  //     <Grid data={assigned_app} pageSize={20} tableStyles="" />
  //   ),
  // };

  console.log(aggApplications);

  return (
    <div className="">
      <div className="flex-center justify-between mb-9">
        <h2 className="page-header">Database</h2>

        <Link to={`/aggregator/staff/add`}>
          <Button className="flex-center gap-2">
            <span className="text-white">Add staff</span>
            <img
              src="/assets/icons/plus-circle.svg"
              className="h-6 w-6"
              alt="carbon-adjust icon"
            />
          </Button>
        </Link>
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
        {
          aggApplications.isSuccess &&
            aggApplications.data?.data.data.applications.length >= 1 && (
              <AggregatorDatabaseGrid
                data={aggApplications.data?.data.data.applications}
                isUpdating={
                  aggApplications.isLoading || aggApplications.isFetching
                }
              />
            )
          // aggApplications.data?.data.data.applications.map(
          //   (app: any, i: number) => <AggAppCard app={app} key={i} />
          // )
        }
      </div>
    </div>
  );
};

// const AggAppCard = ({ app }: { app: any }) => {
//   const queryClient = useQueryClient();

//   const [file, setFile] = useState<File | null>();

//   // const handleSubmit = (type: string) => {};

//   const declineMutation = useMutation({
//     mutationKey: ["decline application"],
//     mutationFn: (id: string) => {
//       const formData = new FormData();

//       if (!file) {
//         toast.error("Attach document");
//       }
//       if (file) {
//         formData.append("file", file);
//       }
//       formData.append("status", "false");

//       return axiosInstance.patch(
//         `applications/${id}/aggregator/review`,
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
//         queryKey: ["get-applications"],
//       });
//     },
//     onError: () => {
//       toast.error("Error approving contractor");
//     },
//   });

//   const approvedMutation = useMutation({
//     mutationKey: ["approve application"],
//     mutationFn: (id: string) => {
//       const formData = new FormData();

//       if (!file) {
//         toast.error("Attach document");
//       }
//       if (file) {
//         formData.append("file", file);
//       }
//       formData.append("status", "true");

//       return axiosInstance.patch(
//         `applications/${id}/aggregator/review`,
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
//         queryKey: ["get-applications"],
//       });
//     },
//     onError: () => {
//       toast.error("Error approving application");
//     },
//   });

//   return (
//     <PlaceholderActionCard>
//       <p>Name: {app.applicant.name}</p>
//       {/* <p>Email: {app.statuses.state}</p> */}
//       <p>Status: {app.currentState}</p>

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

//       {app.currentState !== "Initiated" && (
//         <div className="mt-4 flex flex-col gap-3">
//           <label htmlFor="image">
//             <Button
//               variant={"ghost"}
//               onClick={() => declineMutation.mutate(app._id)}
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
//               onClick={() => approvedMutation.mutate(app._id)}
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

export default Database;

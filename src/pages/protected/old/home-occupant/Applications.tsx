import axiosInstance from "@/api/axiosInstance";
import { HomeOccupantApplicationsHeader } from "@/components/contextual/index";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
// import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Applications = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { activeComponent, applicationModalToShow } = useSelector(
  //   (state) => state.applicationForm
  // );
  const getApplicationStatus = useQuery({
    queryKey: ["application-status"],
    queryFn: () => axiosInstance.get("/applications/me/latest"),
  });

  console.log(getApplicationStatus.data?.data);

  // allApplicationsQuery.isSuccess && allApplicationsQuery.data.length >= 1
  //   ? (dispatch(setActiveApplicationTab("aggregatorApplications")),
  //     dispatch(setActiveComponent("aggregatorApplications")),
  //     dispatch(setAggregatorApplications(allApplicationsQuery.data)))
  //   : (dispatch(setActiveApplicationTab("")), dispatch(setActiveComponent("")));

  // useEffect(() => {
  //   if (
  //     allApplicationsQuery.isSuccess &&
  //     allApplicationsQuery.data.length >= 1
  //   ) {
  //     // dispatch(setActiveApplicationTab("aggregatorApplications"));
  //     // dispatch(setActiveComponent("aggregatorApplications"));
  //     dispatch(setAggregatorApplications(allApplicationsQuery.data));
  //   } else {
  //     // dispatch(setActiveApplicationTab(""));
  //     // dispatch(setActiveComponent(""));
  //   }
  // }, [allApplicationsQuery.data, allApplicationsQuery.isSuccess, dispatch])

  useEffect(() => {
    if (getApplicationStatus.isSuccess) {
      // if (getApplicationStatus.data?.data.data.currentAppStage === 1) {
      //   return navigate("/dashboard/applications/aggregator");
      // }
      if (!getApplicationStatus.data?.data.data.hasApp) {
        return navigate("/dashboard/applications/aggregator-applications");
      }
      if (
        getApplicationStatus.data?.data.data.currentAppStage === 1 &&
        getApplicationStatus.data?.data.data.hasApp &&
        getApplicationStatus.data?.data.data.currentAppStatus === "Initiated"
      ) {
        return navigate(
          "/dashboard/applications/aggregator?state=pending-application"
        );

        // alert("In here");
      }
      if (
        getApplicationStatus.data?.data.data.currentAppStage === 1 &&
        getApplicationStatus.data?.data.data.hasApp &&
        getApplicationStatus.data?.data.data.currentAppStatus === "Rejected"
      ) {
        return navigate(
          "/dashboard/applications/aggregator?state=application-rejected"
        );
      }
      if (
        getApplicationStatus.data?.data.data.currentAppStage === 1 &&
        getApplicationStatus.data?.data.data.hasApp &&
        getApplicationStatus.data?.data.data.currentAppStatus === "Approved"
      ) {
        return navigate(
          "/dashboard/applications/aggregator?state=application-approved"
        );
      }

      if (
        getApplicationStatus.data?.data.data.currentAppStage === 2 &&
        getApplicationStatus.data?.data.data.hasApp &&
        (getApplicationStatus.data?.data.data.currentAppStatus ===
          "Initiated" ||
          getApplicationStatus.data?.data.data.currentAppStatus === "Approved")
      ) {
        return navigate(
          "/dashboard/applications/hia?state=pending-applications"
        );
      }
      if (
        getApplicationStatus.data?.data.data.currentAppStage === 3 &&
        getApplicationStatus.data?.data.data.hasApp &&
        getApplicationStatus.data?.data.data.currentAppStatus === "Approved"
      ) {
        return navigate("/dashboard/applications/finance-applications");
      }
      if (
        getApplicationStatus.data?.data.data.currentAppStage === 3 &&
        getApplicationStatus.data?.data.data.hasApp
      ) {
        return navigate("/dashboard/applications/finance-applications");
      }
      if (getApplicationStatus.data?.data.data.currentAppStage === 4) {
        return navigate("/dashboard/applications/insurance-applications");
      }
    }
  }, [getApplicationStatus.isSuccess]);

  return (
    <div>
      {/* <TabView
        title={"Applications"}
        tabs={[
          { name: "Aggregators", content: <AggregatorGrid /> },
          { name: "HIA", content: "HIA" },
          { name: "Finance Institutions", content: "Finance" },
        ]}
      /> */}
      {/* Tab Components */}
      {/* {allApplicationsQuery.isLoading && (
        <main className="h-screen flex flex-col justify-center items-center">
          <BeatLoader color="#2196F3" />
        </main>
      )} */}
      {/* {allApplicationsQuery.isError && (
        <main className="h-screen flex flex-col justify-center items-center">
          <p className="px-6 text-red-600 font-poppins font-semibold capitalize text-center text-xl">
            Something went wrong.
          </p>
          <p className="px-6 text-red-600 font-poppins font-semibold text-center">
            Could not fetch data at the moment, please check your internet
            connection.
          </p>
        </main>
      )} */}

      <HomeOccupantApplicationsHeader
        currentStage={getApplicationStatus.data?.data.data.currentStage ?? ""}
      />
      <Outlet />
    </div>
  );
};

export default Applications;

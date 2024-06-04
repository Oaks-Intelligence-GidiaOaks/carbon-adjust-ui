// import React from "react";

import TabToggler from "@/components/containers/TabToggler";
// import { Grid } from "@/components/grid";
import { Button } from "@/components/ui";
// import { IComponentMap } from "@/types/general";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import agg_app from "../../../dummy/agg_app.json";
// import assigned_app from "../../../dummy/assigned_app.json";
import DialogComponent from "@/components/reusables/Dialog";
// import { SelectAggregator } from "@/components/dialogs";
import AddSpecializationDialog from "@/components/dialogs/AddSpecialization";
import { useQuery } from "@tanstack/react-query";
import { getHIASpecializations } from "@/services/hiaService";
import SpecializationCard from "@/components/reusables/SpecializationCard";
import { Oval } from "react-loader-spinner";
// import { ArrowRightIcon } from "@heroicons/react/20/solid";

const Specializations = () => {
  const databaseTabs = ["Registration", "Specialization"];
  const navigate = useNavigate();

  const [showAddSpecializationForm, setShowAddSpecializationForm] =
    useState(false);

  const [activeTab] = useState<string>(databaseTabs[1]);

  // const getCurrentTData: IComponentMap = {
  //   Registration: <Grid data={agg_app} pageSize={20} tableStyles="" />,
  //   Specialization: <Grid data={assigned_app} pageSize={20} tableStyles="" />,
  // };

  const specializations = useQuery({
    queryKey: ["get-hia-specializations"],
    queryFn: getHIASpecializations,
  });

  return (
    <div className="">
      <div className="flex-center justify-between mb-9">
        <h2 className="page-header">Subcontractors</h2>

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
          onClick={(text) =>
            navigate(
              text === "Registration"
                ? "/hia/subcontractors/"
                : "/hia/subcontractors/specialization"
            )
          }
        />
      </div>

      {/* table */}
      {/* <div>{getCurrentTData[activeTab]}</div> */}
      <div>
        <div>
          <Button
            className="flex-center gap-2"
            onClick={() => setShowAddSpecializationForm(true)}
          >
            <span className="text-white font-poppins">Add Specialization</span>
            <img
              src="/assets/icons/plus-circle.svg"
              className="h-6 w-6"
              alt="carbon-adjust icon"
            />
          </Button>
        </div>
        {specializations.isLoading && (
          <div className="flex items-center justify-center top-10 gap-6">
            {specializations.isLoading && (
              <Oval
                visible={specializations.isLoading}
                height="20"
                width="20"
                color="#ffffff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            )}
          </div>
        )}
        {specializations.isSuccess &&
          Boolean(specializations.data?.data.data.length > 0) && (
            <div className="flex flex-wrap gap-6 mt-10">
              {specializations.data?.data.data.map(
                (specialization: { name: string }, i: number) => (
                  <SpecializationCard name={specialization.name} key={i} />
                )
              )}
            </div>
          )}
        {specializations.isSuccess &&
          Boolean(specializations.data?.data.data.length < 1) && (
            <div className="flex justify-center bg-white/80 min-h-screen">
              <div className="max-w-[500px] px-2 flex flex-col items-center pt-10">
                <img src="/assets/graphics/empty-box.svg" />
                <p className="text-center font-poppins text-lg font-semibold px-[10%] text-black-main">
                  No created specialization
                </p>
                <p className="text-sm max-w-[360px] text-center text-black-main">
                  Click on the Add specialization button to add specializations
                </p>
              </div>
            </div>
          )}
      </div>
      <DialogComponent
        isOpen={showAddSpecializationForm}
        onOpenChange={() => setShowAddSpecializationForm(false)}
      >
        <AddSpecializationDialog
          setShowAddSpecializationDialog={setShowAddSpecializationForm}
        />
      </DialogComponent>
    </div>
  );
};

export default Specializations;

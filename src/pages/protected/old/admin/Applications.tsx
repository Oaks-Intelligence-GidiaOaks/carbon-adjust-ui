// import React from "react";

import TabToggler from "@/components/containers/TabToggler";
import { Grid } from "@/components/grid";
import { Button } from "@/components/ui";
import { IComponentMap } from "@/types/general";
import { useState } from "react";
import { Link } from "react-router-dom";
import agg_app from "../../../../dummy/agg_app.json";
import assigned_app from "../../../../dummy/assigned_app.json";

const Applications = () => {
  const databaseTabs = ["All Applications", "Assigned Applications"];

  const [activeTab, setActiveTab] = useState<string>(databaseTabs[0]);

  const getCurrentTData: IComponentMap = {
    "All Applications": <Grid data={agg_app} pageSize={20} tableStyles="" />,
    "Assigned Applications": (
      <Grid data={assigned_app} pageSize={20} tableStyles="" />
    ),
  };

  return (
    <div className="">
      <div className="flex-center justify-between mb-9">
        <h2 className="page-header">Database</h2>

        <Link to={`/finance/staff/add`}>
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
      <div>{getCurrentTData[activeTab]}</div>
    </div>
  );
};

export default Applications;

import TabToggler from "@/components/containers/TabToggler";
import { Grid } from "@/components/grid";
import { Button } from "@/components/ui";
import { FC, useState } from "react";
import agg_app from "../../../../dummy/agg_app.json";
import project_review from "../../../../dummy/project_review.json";
import project_completed from "../../../../dummy/project_completed.json";
import { IComponentMap } from "@/types/general";

const Projects: FC = () => {
  const projectTabs = [
    "Create project",
    "Project in review",
    "Project Completed",
  ];

  const [activeTab, setActiveTab] = useState<string>(projectTabs[0]);

  const getCurrentTData: IComponentMap = {
    "Create project": <Grid data={agg_app} pageSize={40} tableStyles={` `} />,
    "Project in review": (
      <Grid data={project_review} pageSize={40} tableStyles={` `} />
    ),
    "Project Completed": (
      <Grid data={project_completed} pageSize={40} tableStyles={` `} />
    ),
  };

  return (
    <div>
      <div className="flex-center justify-between">
        <h2 className="page-header">Project</h2>
        <Button className="flex items-center gap-2">
          <span className="text-white">Create new project</span>

          <img
            src="/assets/icons/plus-circle.svg"
            className="h-6 w-6"
            alt="carbon-adjust icon"
          />
        </Button>
      </div>

      {/* Tab */}
      <div className="mt-6">
        <TabToggler
          tabs={projectTabs}
          activeTab={activeTab}
          onClick={setActiveTab}
        />
      </div>

      <div className="mt-4">{getCurrentTData[activeTab]}</div>
    </div>
  );
};

export default Projects;

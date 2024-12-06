import TabToggler from "@/components/containers/TabToggler";
import { IComponentMap } from "@/types/general";
import { Dispatch, SetStateAction, useState } from "react";
import OrganisationDepartment from "@/components/containers/organisation/OrganisationDepartment";
import OrganisationStaff from "@/components/containers/organisation/OrganisationStaff";

enum OrgTabs {
  Departments = "Departments",
  Staff = "Staff",
}

const Department = () => {
  const [activeTab, setActiveTab] = useState<OrgTabs>(OrgTabs.Departments);

  const getActiveTab: IComponentMap = {
    [OrgTabs.Departments]: <OrganisationDepartment />,
    [OrgTabs.Staff]: <OrganisationStaff />,
  };

  return (
    <div className="frame-container">
      {/* Toggler */}
      <TabToggler
        activeTab={activeTab}
        onClick={setActiveTab as Dispatch<SetStateAction<string>>}
        tabs={[OrgTabs.Departments, OrgTabs.Staff]}
        key={1}
      />

      {/* Toggler Content */}
      <div className="w-full">{getActiveTab[activeTab]}</div>
    </div>
  );
};

export default Department;

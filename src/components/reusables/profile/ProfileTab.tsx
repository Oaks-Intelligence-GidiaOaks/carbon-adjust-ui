import { homeOccupantProfileTabs } from "@/constants";
import { ProfileTabProps } from "@/types/general";
import { cn } from "@/utils";

const ProfileTab = ({
  accountType,
  currentTab,
  setCurrentTab,
}: ProfileTabProps) => {
  switch (accountType) {
    case "home-occupant":
      return (
        <div className="flex max-w-[820px] min-w-[720px] mx-auto bg-white z-50 rounded-t-md">
          {homeOccupantProfileTabs.map((tab) => (
            <button
              onClick={() => setCurrentTab(tab.tabIndex)}
              key={tab.tabIndex}
              className={cn(
                "flex-1 flex border-b-2 justify-center items-center py-4 pb-2 hover:bg-grey-swatch-200 rounded-t-md font-poppins",
                currentTab === tab.tabIndex
                  ? "border-blue-main font-medium"
                  : "border-grey-swatch-400"
              )}
            >
              <span className="text-sm">{tab.name}</span>
            </button>
          ))}
        </div>
      );
    default:
      break;
  }
};

export default ProfileTab;

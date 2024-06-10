// import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";
// import { useNavigate } from "react-router-dom";
// import useBreadcrumbs from "use-react-router-breadcrumbs";
import { SideBarBtn } from "@/assets/icons";
// import { useSelector } from "react-redux";
// import { RootState } from "@/app/store";
// import { Dropdown } from "../ui";
import categories from "../../dummy/categories.json";

import SettingIcon from "../../assets/icons/setting.svg";
import BellIcon from "../../assets/icons/bell.svg";
import UserIcon from "../../assets/icons/User.svg";
import { useLocation } from "react-router-dom";
import SelectInput from "../ui/SelectInput";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

type Props = {
  mobileMenuIsOpen: boolean;
  setMobileMenuIsOpen: Dispatch<SetStateAction<boolean>>;
};

const TopBar = ({ mobileMenuIsOpen, setMobileMenuIsOpen }: Props) => {
  // const breadcrumbs = useBreadcrumbs();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user.user);

  const merchant = "MERCHANT";
  const isMerchant = user?.roles.includes(merchant);

  const getActiveTab = () => {
    const currentPath = location.pathname;

    if (currentPath.includes("appointment")) {
      return "Appointment";
    }

    if (currentPath.includes("orders")) {
      return "Orders";
    }

    if (currentPath.includes("profile")) {
      return "Profile";
    }

    return "MarketPlace";
    // if (currentPath.startsWith('/applications')) {
    //   return 'Applications';
    // }
    // if (currentPath.startsWith('/applications')) {
    //   return 'Applications';
    // }
  };

  // console.log(breadcrumbs, "breadcrumbs");

  // const userData = useSelector((state: RootState) => state.user.user);
  // const navigate = useNavigate();

  // const goToProfile = () => {
  //   if (userData?.roles[0] === "HOME_OCCUPANT") {
  //     return navigate("/dashboard/profile");
  //   }
  //   if (userData?.roles[0] === "AGGREGATOR") {
  //     return navigate("/aggregator/profile");
  //   }
  //   if (userData?.roles[0] === "HIA") {
  //     return navigate("/hia/profile");
  //   }
  //   if (userData?.roles[0] === "FINANCE") {
  //     return navigate("/finance/profile");
  //   }
  //   if (userData?.roles[0] === "INSURANCE") {
  //     return navigate("/insurance/profile");
  //   }
  //   if (userData?.roles[0] === "SUBCONTRACTOR") {
  //     return navigate("/subcontractor/profile");
  //   }
  // };

  return (
    <div className=" px-3 sm:px-4 py-3 w-full flex justify-center font-poppins">
      <div className="flex justify-between items-center w-full max-w-[1440px]">
        <div className="flex items-center w-full  xl:w-5/6  mx-auto">
          {/* mobile sidebar menu icon */}
          <div className="pr-2">
            <SideBarBtn
              className="cursor-pointer sm:hidden"
              onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
            />
          </div>

          <div className="flex-center gap-[18.8px] ">
            <img
              src="/assets/icons/logo-main.svg"
              alt=""
              className="hidden md:inline-flex h-auto w-[30px]"
            />

            <h2 className="font-[400] text-sm">{getActiveTab()}</h2>
          </div>

          {!isMerchant && (
            <div className="hidden lg:flex items-center flex-1  justify-center gap-3 mx-auto">
              {/* dropdown */}
              <div className="w-[180px] ">
                <SelectInput
                  options={categories}
                  placeholder=""
                  className="text-xs"
                />
              </div>

              <div className="flex-center">
                <img
                  src="/assets/icons/clarity_search-line.svg"
                  alt=""
                  className="h-[21px] w-[21px] mr-2"
                />

                <input
                  type="text"
                  placeholder="Purchases"
                  className="flex-1 text-sm outline-none active:outline-none active:border-none "
                />
              </div>
            </div>
          )}

          <div className="flex-center gap-[18px] ml-auto ">
            <img
              className="hidden md:inline-flex "
              src="/assets/graphics/kommunita-logo.svg"
              alt=""
            />

            <div className="flex-center gap-2  ">
              {!isMerchant && (
                <img src={SettingIcon} alt="" className="h-4 w-4" />
              )}

              <img src={BellIcon} alt="" className="h-4 w-4" />

              {!isMerchant && (
                <div className="h-[34px] w-[34px] border rounded-full grid place-items-center ">
                  <img src={UserIcon} alt="" className="h-4 w-4" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

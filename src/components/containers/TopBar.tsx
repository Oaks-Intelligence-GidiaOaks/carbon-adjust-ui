// import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";
// import useBreadcrumbs from "use-react-router-breadcrumbs";
import { SideBarBtn } from "@/assets/icons";

// import SettingIcon from "../../assets/icons/setting.svg";
// import BellIcon from "../../assets/icons/bell.svg";
import UserIcon from "../../assets/icons/User.svg";
import { Link, useLocation } from "react-router-dom";
// import SelectInput from "../ui/SelectInput";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { cn } from "@/utils";
import { UserRole } from "@/interfaces/user.interface";

type Props = {
  mobileMenuIsOpen: boolean;
  setMobileMenuIsOpen: Dispatch<SetStateAction<boolean>>;
};

const TopBar = ({ mobileMenuIsOpen, setMobileMenuIsOpen }: Props) => {
  // const breadcrumbs = useBreadcrumbs();
  const location = useLocation();
  // const role = useSelector((state: RootState) => state.user.user?.roles[0]);
  const kommunitaToken = useSelector(
    (state: RootState) => state.user.kommunitaToken
  );
  const user = useSelector((state: RootState) => state.user.user);

  const merchant = "MERCHANT";
  const admin = "ADMIN";
  const isMerchant = user?.roles.includes(merchant);
  const isAdmin = user?.roles.includes(admin);
  const isAdminStaff = user?.roles.includes(UserRole.ADMIN_STAFF);

  const getActiveTab = () => {
    const currentPath = location.pathname;

    if (currentPath.includes("appointment")) {
      return "Appointment";
    }

    if (currentPath.includes("orders")) {
      return "Orders";
    }

    if (currentPath.includes("merchant")) {
      return "Dashboard";
    }

    if (currentPath.includes("profile")) {
      return "Profile";
    }

    if (currentPath.includes("admin")) {
      return "Dashboard";
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

          <Link
            to={
              isMerchant
                ? "/merchant/"
                : isAdmin
                ? "/admin"
                : isAdminStaff
                ? "/admin-staff"
                : "/dashboard"
            }
            className="flex-center gap-[18.8px] cursor-pointer"
          >
            <img
              src="/assets/icons/logo-main.svg"
              alt=""
              className="hidden md:inline-flex h-auto w-[30px]"
            />

            <h2 className="font-[400] text-sm">{getActiveTab()}</h2>
          </Link>

          {/* {!isMerchant && (
            <div className="hidden lg:flex items-center flex-1  justify-center gap-3 mx-auto">
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
          )} */}

          <div className="flex-center gap-[18px] ml-auto ">
            {/* {role === "HOME_OCCUPANT" && ( */}
            {!isAdmin && (
              <img
                className={cn(
                  "hidden md:inline-flex cursor-pointer hover:scale-105 transition-all",
                  kommunitaToken ? "block" : "hidden"
                )}
                src="/assets/graphics/kommunita-logo.svg"
                alt=""
                onClick={() =>
                  window.location.assign(
                    `https://kommunita-web.netlify.app/home?token=${kommunitaToken}`
                  )
                }
              />
            )}

            {/* )} */}

            <div className="flex-center gap-2  ">
              {/* {!isMerchant && (
                <img src={SettingIcon} alt="" className="h-4 w-4" />
              )} */}

              {/* <img src={BellIcon} alt="" className="h-4 w-4" /> */}

              {!isMerchant && !isAdmin && !isAdminStaff && (
                <Link to={`/dashboard/profile`}>
                  <div className="h-[34px] cursor-pointer w-[34px] border rounded-full grid place-items-center ">
                    <img src={UserIcon} alt="" className="h-4 w-4" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

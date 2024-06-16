import { persistor } from "@/app/store";
import { Logo } from "@/assets/icons";
import {
  adminSideBarItems,
  homeOwnerSideBarItems,
  merchantSideBarItems,
} from "@/constants";
import { SideBarItem, SideBarProps } from "@/types/general";
import { cn } from "@/utils";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const SideMenu = ({
  accountType,
  mobileMenuIsOpen,
  setMobileMenuIsOpen,
}: SideBarProps) => {
  const { pathname } = useLocation();

  const identifyUserSideBar = (accountType: string): SideBarItem[] => {
    switch (accountType) {
      case "home-occupant":
        return homeOwnerSideBarItems;
      case "merchant":
        return merchantSideBarItems;
      case "admin":
        return adminSideBarItems;
      default:
        return homeOwnerSideBarItems;
    }
  };
  return (
    <div>
      {/* desktop sidebar */}
      <div
        className={cn(
          "lg:w-fit max-w-[100px] min-w-[50px] w-fit h-screen px-4 sm:sticky  pb-10 z-10 border-r top-0 hidden md:block fixed bg-white"
        )}
      >
        <div className="grid place-items-center pt-12 pb-2 z-10">
          <Link to="/home" className="">
            <Logo />
          </Link>

          {/* <button className="w-5">
            <ChevronLeftIcon
              color="#139EEC"
              fontSize={20}
              width={20}
              className={cn(
                "text-[#139EEC_!important] hover:bg-gray-200 rounded sm:hidden"
              )}
              onClick={() => setMobileMenuIsOpen(false)}
            />
          </button> */}
        </div>

        <div className="flex flex-col gap-y-5 mt-8">
          {identifyUserSideBar(accountType).map((item, i) => {
            const Icon = item.icon;
            return item.title !== "Logout" ? (
              <Link
                key={i}
                to={`${item.href}`}
                className={cn(
                  " gap-4 items-center font-manrope rounded-full h-12 w-12 grid place-items-center",
                  pathname === `${item.href}`
                    ? "bg-gradient-to-r from-blue-secondary to-blue-main"
                    : "hover:bg-[#D6F2DE]"
                )}
              >
                <Icon
                  className={cn(
                    pathname === `${item.href}` ? "invert brightness-0" : ""
                  )}
                />
              </Link>
            ) : (
              <div
                key={i}
                role="button"
                className={cn(
                  "flex gap-4 py-3 px-2 pl-4 items-center font-manrope rounded-full",
                  pathname === `${item.href}`
                    ? "bg-gradient-to-r from-blue-secondary to-blue-main"
                    : "hover:bg-[#D6F2DE]"
                )}
                onClick={() => {
                  persistor.pause();
                  persistor.flush().then(() => {
                    return persistor.purge();
                  });
                  window.location.assign("/");
                }}
              >
                <Icon
                  className={cn(
                    pathname === `${item.href}` ? "invert brightness-0" : ""
                  )}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* mobile sidebar */}
      <div
        className={cn(
          "w-[20%] min-w-[260px] max-w-[302px] overflow-y-scroll h-screen px-4 pt-10 sm:sticky bg-white z-[100] border-r border-[hsla(110,49%,88%,1)] fixed left-0 top-0 sm:hidden",
          mobileMenuIsOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <img src="/assets/icons/logo-main.svg" alt="" className="w-7" />
            <p className="font-poppins text-black">Carbon-Adjust</p>
          </div>
          <button className="w-5">
            <ChevronLeftIcon
              color="#139EEC"
              fontSize={20}
              width={20}
              className={cn(
                "text-[#139EEC_!important] hover:bg-gray-200 rounded sm:hidden"
              )}
              onClick={() => setMobileMenuIsOpen(false)}
            />
          </button>
        </div>

        <div className="flex flex-col gap-y-4 mt-10 overflow-y-scroll">
          {identifyUserSideBar(accountType).map((item, i) => {
            const Icon = item.icon;
            return item.title !== "Logout" ? (
              <Link
                key={i}
                to={`${item.href}`}
                className={cn(
                  "flex gap-4 py-3 px-2 pl-4 items-center font-manrope rounded-full",
                  pathname === `${item.href}`
                    ? "bg-gradient-to-r from-blue-secondary to-blue-main"
                    : "hover:bg-[#D6F2DE]"
                )}
              >
                <Icon
                  className={cn(
                    pathname === `${item.href}` ? "invert brightness-0" : ""
                  )}
                />
                <span
                  className={cn(
                    "text-sm",
                    pathname === `${item.href}` ? "text-white" : ""
                  )}
                >
                  {item.title}
                </span>
              </Link>
            ) : (
              <div
                key={i}
                role="button"
                className={cn(
                  "flex gap-4 cursor-pointer py-3 px-2 pl-4 items-center font-manrope rounded-full",
                  pathname === `${item.href}`
                    ? "bg-gradient-to-r from-blue-secondary to-blue-main"
                    : "hover:bg-[#D6F2DE]"
                )}
                onClick={() => {
                  persistor.pause();
                  persistor.flush().then(() => {
                    return persistor.purge();
                  });
                  window.location.assign("/");
                }}
              >
                <Icon
                  className={cn(
                    pathname === `${item.href}` ? "invert brightness-0" : ""
                  )}
                />
                <span
                  className={cn(
                    "text-sm",
                    pathname === `${item.href}` ? "text-white" : ""
                  )}
                >
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;

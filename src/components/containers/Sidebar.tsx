import { RootState, persistor } from "@/app/store";
import { Logo } from "@/assets/icons";
import {
  adminSideBarItems,
  adminStaffSideBarItems,
  homeOwnerSideBarItems,
  merchantSideBarItems,
  staffSideBarItems,
} from "@/constants";
import { SideBarItem, SideBarProps } from "@/types/general";
import { cn, formatAccountType } from "@/utils";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SocketService from "@/repository/socket";
import {
  ILoginOutPayload,
  MonitoringEvent,
  SubLevelEvent,
} from "@/interfaces/events.interface";

const Sidebar = ({
  accountType,
  mobileMenuIsOpen,
  setMobileMenuIsOpen,
}: SideBarProps) => {
  const { pathname } = useLocation();

  const user = useSelector((state: RootState) => state.user.user);

  const merchant = "MERCHANT";
  const isMerchant = user?.roles.includes(merchant);

  const identifyUserSideBar = (accountType: string): SideBarItem[] => {
    switch (accountType) {
      case "staff":
        return staffSideBarItems;
      case "home-occupant":
        return homeOwnerSideBarItems;
      case "merchant":
        return merchantSideBarItems;
      case "admin":
        return adminSideBarItems;
      case "admin-staff":
        return adminStaffSideBarItems;
      default:
        return homeOwnerSideBarItems;
    }
  };

  return (
    <>
      {/* desktop sidebar */}
      <div
        className={cn(
          "w-[20%] min-w-[260px] max-w-[302px] max-h-screen px-4 sm:sticky bg-white overflow-y-scroll no-scrollbar pb-10 z-10 border-r border-[hsla(110,49%,88%,1)] top-0 hidden sm:block "
        )}
      >
        <div className="flex justify-between items-center sticky top-0 pt-10 pb-2 z-10 bg-white">
          <div className="flex items-center gap-x-2 sticky top-0">
            <Logo />
            <p className="font-poppins text-black">Carbon-Adjust</p>
          </div>

          <button className="w-5">
            <ChevronLeftIcon
              color="#139EEC"
              // fill="#139EEC"
              fontSize={20}
              width={20}
              className={cn(
                "text-[#139EEC_!important] hover:bg-gray-200 rounded sm:hidden",
              )}
              onClick={() => setMobileMenuIsOpen(false)}
            />
          </button>
        </div>

        <div className="flex flex-col gap-y-4 mt-8 h-[80vh]">
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
                    : "hover:bg-[#D6F2DE]",
                )}
              >
                <Icon
                  className={cn(
                    pathname === `${item.href}` ? "invert brightness-0" : "",
                  )}
                />
                <span
                  className={cn(
                    "text-sm",
                    pathname === `${item.href}` ? "text-white" : "",
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
                  "flex gap-4 py-3 px-2 pl-4 items-center font-manrope rounded-full",
                  pathname === `${item.href}`
                    ? "bg-gradient-to-r from-blue-secondary to-blue-main"
                    : "hover:bg-[#D6F2DE]",
                )}
                onClick={() => {
                  persistor.pause();
                  persistor.flush().then(() => {
                    const logoutPayload: ILoginOutPayload = {
                      userId: user?._id as string,
                      time: Date.now(),
                      eventName: SubLevelEvent.LOGOUT_USER_EVENT,
                    };

                    SocketService.emit(
                      MonitoringEvent.NEW_SUBLEVEL_EVENT,
                      logoutPayload,
                    );
                    return persistor.purge();
                  });
                  window.location.assign("/");
                }}
              >
                <Icon
                  className={cn(
                    pathname === `${item.href}` ? "invert brightness-0" : "",
                  )}
                />
                <span
                  className={cn(
                    "text-sm",
                    pathname === `${item.href}` ? "text-white" : "",
                  )}
                >
                  {item.title}
                </span>
              </div>
            );
          })}

          {isMerchant && (
            <div className="flex-center gap-4 mt-auto">
              <img
                src={user?.dp ?? "/assets/graphics/user-img.svg"}
                alt=""
                className="h-10 w-10 rounded-full border"
              />

              <div
                className="flex flex-col gap-1 font-poppins
            "
              >
                <h2 className="font-[500] text-base truncate max-w-[170px]">
                  {user?.name}
                </h2>
                <h2 className="text-xs text-[#7A8699] truncate max-w-[180px] font-[400]">
                  {/* {formatAccountType(user?.merchantType ?? "")} */}
                  {formatAccountType(user?.contactName ?? "")}
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* mobile sidebar */}
      <div
        className={cn(
          "w-[20%] min-w-[260px] max-w-[302px] overflow-y-scroll no-scrollbar  h-screen px-4 pt-10 sm:sticky bg-white z-[100] border-r border-[hsla(110,49%,88%,1)] fixed left-0 top-0 sm:hidden",
          mobileMenuIsOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <Logo />

            <p className="font-poppins text-black">Carbon-Adjust</p>
          </div>
          <button className="w-5">
            <ChevronLeftIcon
              color="#139EEC"
              // fill="#139EEC"
              fontSize={20}
              width={20}
              className={cn(
                "text-[#139EEC_!important] hover:bg-gray-200 rounded sm:hidden",
              )}
              onClick={() => setMobileMenuIsOpen(false)}
            />
          </button>
        </div>

        <div className="flex flex-col gap-y-4 mt-10 overflow-y-scroll no-scrollbar">
          {identifyUserSideBar(accountType).map((item, i) => {
            const Icon = item.icon;
            return item.title !== "Logout" ? (
              <Link
                key={i}
                to={`${item.href}`}
                onClick={() => setMobileMenuIsOpen(false)}
                className={cn(
                  "flex gap-4 py-3 px-2 pl-4 items-center font-manrope rounded-full",
                  pathname === `${item.href}`
                    ? "bg-gradient-to-r from-blue-secondary to-blue-main"
                    : "hover:bg-[#D6F2DE]",
                )}
              >
                <Icon
                  className={cn(
                    pathname === `${item.href}` ? "invert brightness-0" : "",
                  )}
                />
                <span
                  className={cn(
                    "text-sm",
                    pathname === `${item.href}` ? "text-white" : "",
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
                    : "hover:bg-[#D6F2DE]",
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
                    pathname === `${item.href}` ? "invert brightness-0" : "",
                  )}
                />
                <span
                  className={cn(
                    "text-sm",
                    pathname === `${item.href}` ? "text-white" : "",
                  )}
                >
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

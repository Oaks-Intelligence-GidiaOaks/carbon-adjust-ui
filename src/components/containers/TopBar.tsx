import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { SideBarBtn } from "@/assets/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Dropdown } from "../ui";

type Props = {
  mobileMenuIsOpen: boolean;
  setMobileMenuIsOpen: Dispatch<SetStateAction<boolean>>;
};

const TopBar = ({ mobileMenuIsOpen, setMobileMenuIsOpen }: Props) => {
  const breadcrumbs = useBreadcrumbs();
  const userData = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const goToProfile = () => {
    if (userData?.roles[0] === "HOME_OCCUPANT") {
      return navigate("/dashboard/profile");
    }
    if (userData?.roles[0] === "AGGREGATOR") {
      return navigate("/aggregator/profile");
    }
    if (userData?.roles[0] === "HIA") {
      return navigate("/hia/profile");
    }
    if (userData?.roles[0] === "FINANCE") {
      return navigate("/finance/profile");
    }
    if (userData?.roles[0] === "INSURANCE") {
      return navigate("/insurance/profile");
    }
    if (userData?.roles[0] === "SUBCONTRACTOR") {
      return navigate("/subcontractor/profile");
    }
  };

  return (
    <div className="h-10 px-2 sm:px-4 py-6 w-full flex justify-center font-poppins">
      <div className="flex justify-between items-center w-full max-w-[1440px]">
        <div className="flex items-center border">
          <div className="pr-2">
            <SideBarBtn
              className="cursor-pointer sm:hidden"
              onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
            />
          </div>

          <img
            src="/assets/icons/logo-main.svg"
            alt=""
            className="hidden md:inline-flex h-auto w-[30px]"
          />

          <h2 className="font-[400] text-sm ml-[18px]">Marketplace</h2>

          <div className="bg-[#CECECE] flex w-[299px] h-[38px] rounded-[12px] px-4">
            <select className="flex-1 bg-transparent" name="" id="">
              {Array.from({ length: 7 }, (_, i) => (
                <option value="" key={i}>
                  Home Energy Plans
                </option>
              ))}
            </select>
          </div>

          {/* {breadcrumbs.map(({ match, breadcrumb, key }, i, arr) => (
            <div key={key}>
              <Link
                key={match.pathname}
                to={match.pathname}
                className="capitalize font-poppins"
              >
                <span className="text-black-main text-xs sm:text-sm">
                  {breadcrumb}
                </span>
              </Link>
              {i < arr.length - 1 ? <span>/</span> : null}
            </div>
          ))} */}
        </div>

        <div className="pr-4 border">
          <div className="flex gap-1 items-center">
            <div
              className="flex justify-center items-center cursor-pointer"
              role="button"
              onClick={() => goToProfile()}
            >
              {userData?.dp ? (
                <img
                  className="size-8 rounded-full shadow object-cover"
                  src={userData.dp}
                />
              ) : (
                <UserCircleIcon fontSize={20} width={32} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

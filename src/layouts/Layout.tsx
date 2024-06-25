import userService from "@/api/services/user";
import { persistor, RootState } from "@/app/store";
import Footer from "@/components/containers/Footer";
import SideMenu from "@/components/containers/SideMenu";
// import { RootState } from "@/app/store";
import Sidebar from "@/components/containers/Sidebar";
import TopBar from "@/components/containers/TopBar";
import InactivityWrapper from "@/components/hoc/InactivityWrapper";
// import InactivityWrapper from "@/components/hoc/InactivityWrapper";
import { setUser } from "@/features/userSlice";
import ProtectedRoute from "@/guards/ProtectedRoute";
import UseScrollToTop from "@/hooks/useScrollToTop";
import { AuthUserProfile } from "@/types/general";
// import ProtectedRoute from "@/guards/ProtectedRoute";
import { cn, uniqueObjectsByIdType } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
// import toast from "react-hot-toast";
// import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

type Props = {
  sidebarType: string;
};

const Layout = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contentRef = useRef(null);

  const { pathname } = useLocation();
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user.user);

  const userData = useQuery({
    queryKey: ["fetch-user-info"],
    queryFn: userService().fetchUserInfo,
  });
  // console.log(userData);

  const handleRedirect = (user: AuthUserProfile, role: string) => {
    if (role === "HOME_OCCUPANT") return navigate("/dashboard");
    if (role === "ADMIN") return navigate("/admin");
    if (role === "MERCHANT") {
      if (user.status === "pending") {
        return navigate("/account-setup");
      }
      return navigate("/merchant");
    }
  };
  // ---------------------UNCOMMENT THIS CODE WHEN ADMIN STARTS VERIFYING USERS
  useEffect(() => {
    // User data loaded successfully and there's user data in state
    if (userData.isSuccess && user) {
      dispatch(setUser(userData.data.data.data));
      // console.log(userData.data.data.data);
      if (userData.data.data.data.roles[0] === "ADMIN") {
        if (pathname.includes("admin")) return;
        return navigate("/admin");
      }
      if (userData.data.data.data.roles[0] === "HOME_OCCUPANT") {
        if (pathname.includes("dashboard")) return;
        return navigate("/dashboard");
      }
      // NON_FINANCIAL MERCHANT PATH
      if (
        userData.data.data.data.roles[0] === "MERCHANT" &&
        userData.data.data.data.merchantType === "NON_FINANCIAL_MERCHANT"
      ) {
        if (pathname.includes("merchant")) return;

        handleRedirect(
          userData.data.data.data,
          userData.data.data.data.roles[0]
        );

        // if (
        //   userData.data.data.data.nonFinancialMerchantType ===
        //     "SELF_EMPLOYED" &&
        //   uniqueObjectsByIdType(userData.data.data.data?.doc).length < 2
        // ) {
        //   console.log("here");
        //   return navigate("/account-setup");
        // }
        // if (
        //   userData.data.data.data.nonFinancialMerchantType ===
        //     "SELF_EMPLOYED_LICENSE" &&
        //   uniqueObjectsByIdType(userData.data.data.data?.doc).length < 3
        // ) {
        //   console.log("here");
        //   return navigate("/account-setup");
        // }
        // if (
        //   userData.data.data.data.nonFinancialMerchantType ===
        //     "LIMITED_LIABILITY" &&
        //   uniqueObjectsByIdType(userData.data.data.data?.doc).length < 3
        // ) {
        //   console.log("here");
        //   return navigate("/account-setup");
        // }
        // if (
        //   userData.data.data.data.nonFinancialMerchantType ===
        //     "LIMITED_LIABILITY_LICENSE" &&
        //   uniqueObjectsByIdType(userData.data.data.data?.doc).length < 4
        // ) {
        //   console.log("here");
        //   return navigate("/account-setup");
        // }
        // if (
        //   !userData.data.data.data.nonFinancialMerchantType &&
        //   uniqueObjectsByIdType(userData.data.data.data?.doc).length < 4
        // ) {
        //   console.log("here");
        //   if (pathname.includes("merchant")) {
        //     console.log("Here");
        //     return;
        //   }
        //   return navigate("/merchant");
        // }
        // console.log("here");
        // return navigate("/merchant");
      }
      // FINANCIAL MERCHANT PATH
      if (
        userData.data.data.data.roles[0] === "MERCHANT" &&
        userData.data.data.data.merchantType === "FINANCIAL_MERCHANT"
      ) {
        handleRedirect(
          userData.data.data.data,
          userData.data.data.data.roles[0]
        );
        // console.log(uniqueObjectsByIdType(userData.data.data.data?.doc).length);
        // console.log(uniqueObjectsByIdType(userData.data.data.data?.doc));
        // if (uniqueObjectsByIdType(userData.data.data.data?.doc).length < 4) {
        //   return navigate("/account-setup");
        // }
        // return navigate("/merchant");
      }
    }
    // User data loaded successfully and no user data in state
    if (userData.isSuccess && !user) {
      dispatch(setUser(userData.data.data.data));
      if (userData.data.data.data.roles[0] === "ADMIN") {
        return navigate("/admin");
      }
      // NON_FINANCIAL MERCHANT PATH
      if (
        userData.data.data.data.roles[0] === "MERCHANT" &&
        userData.data.data.data.merchantType === "NON_FINANCIAL_MERCHANT"
      ) {
        if (
          userData.data.data.data.nonFinancialMerchantType ===
            "SELF_EMPLOYED" &&
          uniqueObjectsByIdType(userData.data.data.data?.doc).length < 2
        ) {
          return navigate("/account-setup");
        }
        if (
          userData.data.data.data.nonFinancialMerchantType ===
            "SELF_EMPLOYED_LICENSE" &&
          uniqueObjectsByIdType(userData.data.data.data?.doc).length < 3
        ) {
          return navigate("/account-setup");
        }
        if (
          userData.data.data.data.nonFinancialMerchantType ===
            "LIMITED_LIABILITY" &&
          uniqueObjectsByIdType(userData.data.data.data?.doc).length < 3
        ) {
          return navigate("/account-setup");
        }
        if (
          userData.data.data.data.nonFinancialMerchantType ===
            "LIMITED_LIABILITY_LICENSE" &&
          uniqueObjectsByIdType(userData.data.data.data?.doc).length < 4
        ) {
          return navigate("/account-setup");
        }
        if (
          !userData.data.data.data.nonFinancialMerchantType &&
          uniqueObjectsByIdType(userData.data.data.data?.doc).length < 4
        ) {
          console.log("here");
          return navigate("/account-setup");
        }
        console.log("Here");
        if (pathname.includes("merchant")) {
          console.log("Here");
          return;
        }
        return navigate("/merchant");
      }
      // FINANCIAL MERCHANT PATH
      if (
        userData.data.data.data.roles[0] === "MERCHANT" &&
        userData.data.data.data.merchantType === "FINANCIAL_MERCHANT"
      ) {
        console.log(uniqueObjectsByIdType(userData.data.data.data?.doc).length);
        console.log(uniqueObjectsByIdType(userData.data.data.data?.doc));
        if (uniqueObjectsByIdType(userData.data.data.data?.doc).length < 4) {
          return navigate("/account-setup");
        }
        return navigate("/merchant");
      }
      return navigate("/dashboard");
    }
    // error encountered
  }, [userData.isSuccess]);

  const handleLogout = () => {
    // pause();
    persistor.flush().then(() => {
      return persistor.purge();
    });
    window.location.assign("/login?ie=true");
  };

  UseScrollToTop(contentRef);

  return (
    <ProtectedRoute role={user?.roles[0]}>
      <InactivityWrapper onLogout={() => handleLogout()}>
        <div className="flex max-h-screen max-w-screen overflow-hidden overflow-y-scroll">
          {props.sidebarType === "home-occupant" ? (
            <SideMenu
              accountType={props.sidebarType}
              mobileMenuIsOpen={mobileMenuIsOpen}
              setMobileMenuIsOpen={setMobileMenuIsOpen}
            />
          ) : (
            <Sidebar
              accountType={props.sidebarType}
              mobileMenuIsOpen={mobileMenuIsOpen}
              setMobileMenuIsOpen={setMobileMenuIsOpen}
            />
          )}

          <div className="flex-1 items-center">
            <TopBar
              mobileMenuIsOpen={mobileMenuIsOpen}
              setMobileMenuIsOpen={setMobileMenuIsOpen}
            />
            <div
              ref={contentRef}
              className={cn(
                "font-poppins w-full max-w-[1440px] pb-16 mx-auto h-full overflow-y-scroll",
                pathname.includes("dashboard/applications") && "px-0",
                pathname === "/dashboard/devices" && "px-0",
                pathname === "/dashboard/profile" && "px-0"
              )}
            >
              <div className="relative ">
                <div className="relative z-10">
                  <Outlet />
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </InactivityWrapper>
    </ProtectedRoute>
  );
};

export default Layout;

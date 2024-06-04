import userService from "@/api/services/user";
import { persistor, RootState } from "@/app/store";
import Footer from "@/components/containers/Footer";
import SideMenu from "@/components/containers/SideMenu";
// import { RootState } from "@/app/store";
import Sidebar from "@/components/containers/Sidebar";
import TopBar from "@/components/containers/TopBar";
import InactivityWrapper from "@/components/hoc/InactivityWrapper";
import { setUser } from "@/features/userSlice";
import ProtectedRoute from "@/guards/ProtectedRoute";
import { cn, uniqueObjectsByIdType } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

type Props = {
  sidebarType: string;
};

const Layout = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user.user);

  const userData = useQuery({
    queryKey: ["fetch-user-info"],
    queryFn: userService().fetchUserInfo,
  });

  // ---------------------UNCOMMENT THIS CODE WHEN ADMIN STARTS VERIFYING USERS
  // useEffect(() => {
  //   // User data loaded successfully and there's user data in state
  //   if (userData.isSuccess && user) {
  //     dispatch(setUser(userData.data.data.data));

  //     const role = user.roles[0];

  //     if (role) {
  //       // home owner checks
  //       if (role === "HOME_OCCUPANT") {
  //         // it pathname is not for homeoccupant
  //         if (
  //           ![
  //             "hia",
  //             "aggregator",
  //             "finance",
  //             "subcontractor",
  //             "insurance",
  //             "admin",
  //           ].every((type) => !pathname.includes(type))
  //         ) {
  //           navigate("/dashboard");
  //         }
  //       }
  //       if (role === "AGGREGATOR") {
  //         // it pathname is not for homeoccupant
  //         if (["aggregator"].every((type) => !pathname.includes(type))) {
  //           navigate("/aggregator");
  //         }
  //       }
  //       if (role === "HIA") {
  //         // it pathname is not for homeoccupant
  //         if (["hia"].every((type) => !pathname.includes(type))) {
  //           navigate("/hia");
  //         }
  //       }
  //       if (role === "FINANCE") {
  //         // it pathname is not for homeoccupant
  //         if (["finance"].every((type) => !pathname.includes(type))) {
  //           navigate("/finance");
  //         }
  //       }
  //       if (role === "INSURANCE") {
  //         // it pathname is not for homeoccupant
  //         if (["insurance"].every((type) => !pathname.includes(type))) {
  //           navigate("/insurance");
  //         }
  //       }
  //       if (role === "SUBCONTRACTOR") {
  //         // it pathname is not for homeoccupant
  //         if (["subcontractor"].every((type) => !pathname.includes(type))) {
  //           navigate("/subcontractor");
  //         }
  //       }
  //       if (role === "ADMIN") {
  //         // it pathname is not for homeoccupant
  //         if (["admin"].every((type) => !pathname.includes(type))) {
  //           navigate("/admin");
  //         }
  //       }
  //     }
  //   }

  //   // User data loaded successfully and no user data in state
  //   if (userData.isSuccess && !user) {
  //     dispatch(setUser(userData.data.data.data));

  //     console.log(userData.data.data.data);

  //     if (userData.data.data.data.roles[0] === "ADMIN") {
  //       return navigate("/admin");
  //     }
  //     if (
  //       userData.data.data.data.roles[0] !== "HOME_OCCUPANT" &&
  //       uniqueObjectsByIdType(userData.data.data.data?.doc).length < 3
  //     ) {
  //       return navigate("/account-setup");
  //     }
  //     if (
  //       userData.data.data.data.status === "pending" &&
  //       (userData.data.data.data?.step < 4 || !userData.data.data.data?.step)
  //     ) {
  //       return navigate("/account-setup");
  //     }
  //     if (userData.data.data.data.status === "pending") {
  //       return navigate("/pending-verification");
  //     }
  //     if (userData.data.data.data.roles[0] === "AGGREGATOR") {
  //       return navigate("/aggregator");
  //     }
  //     if (userData.data.data.data.roles[0] === "HIA") {
  //       return navigate("/hia");
  //     }
  //     if (userData.data.data.data.roles[0] === "FINANCIAL_INSTITUTION") {
  //       return navigate("/finance");
  //     }
  //     if (userData.data.data.data.roles[0] === "INSURANCE") {
  //       return navigate("/insurance");
  //     }
  //     if (userData.data.data.data.roles[0] === "SUBCONTRACTOR") {
  //       return navigate("/subcontractor");
  //     }
  //     return navigate("/dashboard");
  //   }
  //   // error encountered
  // }, [userData.isSuccess]);

  const handleLogout = () => {
    persistor.pause();
    persistor.flush().then(() => {
      return persistor.purge();
    });
    window.location.assign("/login?ie=true");
  };

  return (
    // <ProtectedRoute role={user?.roles[0]}>
    // <InactivityWrapper onLogout={() => handleLogout()}>
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
          className={cn(
            "font-poppins w-full max-w-[1440px] pb-16 px-4 mx-auto h-full overflow-y-scroll",
            pathname.includes("dashboard/applications") && "px-0",
            pathname === "/dashboard/devices" && "px-0",
            pathname === "/dashboard/profile" && "px-0"
          )}
        >
          {/* {userData.isLoading ? (
            <div className="w-full h-full flex justify-center pt-20">
              <Oval
                visible={userData.isLoading}
                height="40"
                width="40"
                color="#ffffff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : ( */}
          <Outlet />
          <Footer />

          {/* )} */}
        </div>

        {/* footer */}
      </div>
    </div>
    // </InactivityWrapper>
    // </ProtectedRoute>
  );
};

export default Layout;

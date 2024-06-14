import {
  createBrowserRouter,
  // Navigate,
  // ScrollRestoration,
} from "react-router-dom";
import { Calendar, Home, Login, Register } from "@/pages/public";
import AccountSetup from "@/pages/protected/shared/account-setup/AccountSetup";
import Layout from "@/layouts/Layout";

import PendingVerification from "@/pages/protected/shared/PendingVerification";
// import Registration from "@/pages/protected/old/hia/Registration";
// import Specializations from "@/pages/protected/old/hia/Specialization";
// import {
//   HOAggregatorApplications,
//   HOFinanceApplications,
//   HOHIAApplications,
//   HOInsuranceApplications,
// } from "@/components/sub-pages/applications";
// import {
//   FinanceMorePage,
//   HIAMorePage,
//   InsuranceMorePage,
//   SubContractorMorePage,
// } from "@/components/sub-pages/dashboard/home-occupant";
// import ApplyToInsurance from "@/pages/protected/old/home-occupant/ApplyToInsurance";

import DashboardLanding from "@/pages/protected/shared/DashboardLanding";
import Market from "@/pages/protected/home-occupant/Market";
import {
  AccountManagement,
  AdminAds,
  AdminDashboard,
  AdminDisputes,
  AdminNewAd,
  AdminNewUser,
  AdminSales,
  AdminTransactions,
  AdminWallet,
  AdmnLog,
} from "@/pages/protected/admin";
// import { elements } from "chart.js";
import {
  CreatePackageSchedule,
  MerchantAllPackages,
  MerchantApplications,
  MerchantBookings,
  MerchantDashboard,
  MerchantNewPackage,
  MerchantOrderDetails,
  MerchantPackageDetails,
  MerchantPackages,
  MerchantProfile,
  MerchantWallet,
} from "@/pages/protected/merchant";
import {
  UserAppointment,
  UserMarketGroup,
  UserMarketPlace,
  UserOrderList,
  UserProfile,
} from "@/pages/protected/home-occupant";
// import { Profile } from "@/pages/protected/old/home-occupant";
import MerchantRegister from "@/pages/public/MerchantRegister";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/calendar",
    element: <Calendar />,
  },
  {
    path: "/home",
    element: <DashboardLanding />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/merchant/register",
    element: <MerchantRegister />,
  },
  {
    path: "/account-setup",
    element: <AccountSetup />,
  },
  {
    path: "/pending-verification",
    element: <PendingVerification />,
  },
  // END USER ROUTES
  {
    path: "/dashboard",
    element: <Layout sidebarType="home-occupant" />,
    children: [
      {
        path: "",
        element: <Market />,
        // children: [
        //   {
        //     path: "",
        //     element: <Market />,
        //   },
        // ],
      },
      {
        path: "order-booking",
        element: <UserAppointment />,
      },
      {
        path: "order-booking/:orderId",
        element: <UserAppointment />,
      },

      {
        path: "marketplace",
        element: <UserMarketPlace />,
      },
      {
        path: "marketplace/:category",
        element: <UserMarketGroup />,
      },
      {
        path: "orders",
        element: <UserOrderList />,
      },
      // {
      //   path: "applications",
      //   element: <Applications />,
      //   children: [
      //     {
      //       path: "",
      //       element: (
      //         <>
      //           <Navigate
      //             to={"/dashboard/applications/merchant-applications"}
      //           />
      //           <ScrollRestoration />
      //         </>
      //       ),
      //     },
      //     {
      //       path: "merchant",
      //       element: <ApplyToAggregator />,
      //     },
      //     {
      //       path: "merchant-applications",
      //       element: <HOAggregatorApplications />,
      //     },
      //   ],
      // },
      {
        path: "profile",
        element: <UserProfile />,
      },
    ],
  },

  // MERCHANT ROUTES
  {
    path: "/merchant",
    element: <Layout sidebarType="merchant" />,
    children: [
      {
        path: "",
        element: <MerchantDashboard />,
      },
      {
        path: "applications",
        children: [
          {
            path: "",
            element: <MerchantApplications />,
          },

          {
            path: ":orderId",
            element: <MerchantOrderDetails />,
          },
        ],
      },
      {
        path: "bookings",
        element: <MerchantBookings />,
      },
      {
        path: "packages",
        children: [
          {
            path: "",
            element: <MerchantPackages />,
          },
          {
            path: "schedule/:packageId",
            element: <CreatePackageSchedule />,
          },
          {
            path: "new",
            element: <MerchantNewPackage />,
          },
          {
            path: "all",
            element: <MerchantAllPackages />,
          },
          {
            path: ":packageId",
            element: <MerchantPackageDetails />,
          },
        ],
      },
      {
        path: "profile",
        element: <MerchantProfile />,
      },
      {
        path: "wallet",
        element: <MerchantWallet />,
      },
      {
        path: "inbox",
        element: <MerchantWallet />,
      },
    ],
  },

  // ADMIN ROUTES
  {
    path: "/admin",
    element: <Layout sidebarType="admin" />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
      {
        path: "ads",
        children: [
          {
            path: "",
            element: <AdminAds />,
          },
          {
            path: "new",
            element: <AdminNewAd />,
          },
        ],
      },
      {
        path: "disputes",
        element: <AdminDisputes />,
      },
      {
        path: "logs",
        element: <AdmnLog />,
      },

      {
        path: "users",
        children: [
          {
            path: "",
            element: <AccountManagement />,
          },
          {
            path: "add",
            element: <AdminNewUser />,
          },
        ],
      },
      {
        path: "sales",
        element: <AdminSales />,
      },
      {
        path: "transactions",
        element: <AdminTransactions />,
      },
      {
        path: "wallet",
        element: <AdminWallet />,
      },
    ],
  },
]);

export default Router;

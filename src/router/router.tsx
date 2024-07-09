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
  // AdminDisputes,
  AdminNewAd,
  AdminNewUser,
  AdminPackages,
  // AdminSales,
  // AdminTransactions,
  AdminWallet,
  AdmnLog,
} from "@/pages/protected/admin";
// import { elements } from "chart.js";
import {
  AddStaff,
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
  MerchantStaff,
  MerchantWallet,
  StaffDetails,
  UpdatePackageDetails,
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
import ManagePackageSchedule from "@/pages/protected/merchant/ManagePackageSchedule";
import Payment from "@/pages/protected/home-occupant/Payment";
import PaymentSuccess from "@/components/containers/checkout/PaymentSuccess";
import TermsAndConditions from "@/pages/TermsAndConditions";
import ForgotPassword from "@/pages/public/ForgotPassword";
import ResetPassword from "@/pages/public/ResetPassword";
import { StaffApplications, StaffDashboard } from "@/pages/protected/staff";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
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
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "payment/:orderId",
        element: <Payment />,
      },
      {
        path: "payment/success",
        element: <PaymentSuccess />,
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
            path: "schedule/slots/:packageId",
            element: <ManagePackageSchedule />,
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
          {
            path: "update/:packageId",
            element: <UpdatePackageDetails />,
          },
        ],
      },
      {
        path: "staff",
        children: [
          {
            path: "",
            element: <MerchantStaff />,
          },
          {
            path: "add",
            element: <AddStaff />,
          },
          {
            path: ":packageId",
            element: <StaffDetails />,
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
          {
            path: "update/:packageId",
            element: <UpdatePackageDetails />,
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

  // STAFF ROUTES
  {
    path: "/staff",
    element: <Layout sidebarType="staff" />,
    children: [
      {
        path: "",
        element: <StaffDashboard />,
      },
      {
        path: "orders",
        element: <StaffApplications />,
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
      // {
      //   path: "disputes",
      //   element: <AdminDisputes />,
      // },
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
      // {
      //   path: "sales",
      //   element: <AdminSales />,
      // },
      // {
      //   path: "transactions",
      //   element: <AdminTransactions />,
      // },
      {
        path: "wallet",
        element: <AdminWallet />,
      },
      {
        path: "packages",
        element: <AdminPackages />,
      },
    ],
  },
]);

export default Router;

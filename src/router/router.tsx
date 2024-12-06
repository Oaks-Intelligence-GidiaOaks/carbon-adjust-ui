import { createBrowserRouter } from "react-router-dom";
import { Calendar, Home, Login, Register, _404 } from "@/pages/public";
import AccountSetup from "@/pages/protected/shared/account-setup/AccountSetup";
import Layout from "@/layouts/Layout";

import PendingVerification from "@/pages/protected/shared/PendingVerification";

import DashboardLanding from "@/pages/protected/shared/DashboardLanding";
import Market from "@/pages/protected/home-occupant/Market";
import {
  AccountManagement,
  AdminAddStaff,
  AdminAds,
  AdminDashboard,
  AdminDevices,
  AdminEditAd,
  AdminNewAd,
  AdminNewUser,
  AdminOrderDetails,
  AdminOrders,
  AdminPackages,
  AdminSettings,
  AdminStaff,
  AdminWallet,
  AdmnLog,
} from "@/pages/protected/admin";
import {
  AddStaff,
  CreatePackageSchedule,
  MerchantAllPackages,
  MerchantApplications,
  MerchantBookings,
  MerchantDashboard,
  MerchantNewClaim,
  MerchantNewGrantPackage,
  MerchantNewPackage,
  MerchantOrderDetails,
  MerchantPackageDetails,
  MerchantPackages,
  MerchantProfile,
  MerchantStaff,
  MerchantWallet,
  StaffDetails,
  SuperMerchantClaims,
  SuperMerchantSubApplications,
  UpdatePackageDetails,
} from "@/pages/protected/merchant";
import {
  UserAppointment,
  UserCart,
  UserCheckout,
  UserDevices,
  UserMarketGroup,
  UserMarketPlace,
  UserNewDevice,
  UserNewTransport,
  UserOrderList,
  UserProduct,
  UserProfile,
  UserPurchases,
  UserTransport,
  UserWallet,
} from "@/pages/protected/home-occupant";

import MerchantRegister from "@/pages/public/MerchantRegister";
import ManagePackageSchedule from "@/pages/protected/merchant/ManagePackageSchedule";
import Payment from "@/pages/protected/home-occupant/Payment";
import PaymentSuccess from "@/components/containers/checkout/PaymentSuccess";
import ForgotPassword from "@/pages/public/ForgotPassword";
import ResetPassword from "@/pages/public/ResetPassword";
import { StaffApplications, StaffDashboard } from "@/pages/protected/staff";
import PrivacyPolicy from "@/pages/public/PrivacyPolicy";
import TermsAndConditions from "@/pages/public/TermsAndConditions";
import MerchantTermsAndConditions from "@/pages/public/MerchantTermsAndConditions";
import { AdminStaffOrders } from "@/pages/protected/staffAdmin";
import AssetsLayout from "@/layouts/AssetsLayout";
import ComingSoon from "@/components/reusables/ComingSoon";
import ZohoPage from "@/pages/public/test";
import BuildingList from "@/components/containers/buildings/BuildingList";
import LoginTest from "@/pages/public/Login_test";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/test",
    element: <ZohoPage />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
  },
  {
    path: "/terms-and-conditions/merchant",
    element: <MerchantTermsAndConditions />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
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
        path: "purchases",
        element: <UserPurchases />,
      },
      {
        path: "product/:packageId",
        element: <UserProduct />,
      },
      {
        path: "checkout",
        element: <UserCheckout />,
      },
      {
        path: "cart",
        element: <UserCart />,
      },
      {
        path: "devices",
        element: <AssetsLayout />,
        children: [
          {
            path: "",
            element: <UserDevices />,
          },
          {
            path: "add",
            element: <UserNewDevice />,
          },
          {
            path: ":deviceId/edit",
            element: <UserNewDevice />,
          },
        ],
      },
      {
        path: "wallet",
        element: <UserWallet />,
      },
      {
        path: "buildings",
        element: <AssetsLayout />,
        children: [
          {
            path: "",
            element: <BuildingList />,
          },
        ],
      },
      {
        path: "transport",
        element: <AssetsLayout />,
        children: [
          {
            path: "",
            element: <UserTransport />,
          },
          {
            path: "add",
            element: <UserNewTransport />,
          },
        ],
      },
      {
        path: "others",
        element: <AssetsLayout />,
        children: [
          {
            path: "",
            element: <ComingSoon />,
          },
        ],
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
        path: "grant-applications",
        children: [
          {
            path: "",
            element: <MerchantApplications />,
          },
          {
            path: ":applicationId",
            element: <SuperMerchantSubApplications />,
          },
        ],
      },
      {
        path: "claims",
        children: [
          {
            path: "",
            element: <SuperMerchantClaims />,
          },
          {
            path: "new",
            element: <MerchantNewClaim />,
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
        path: "grant-packages",
        children: [
          {
            path: "new",
            element: <MerchantNewGrantPackage />,
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
        children: [
          {
            path: "",
            element: <StaffApplications />,
          },
          {
            path: ":orderId",
            element: <MerchantOrderDetails />,
          },
        ],
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
          {
            path: ":adId/edit",
            element: <AdminEditAd />,
          },
        ],
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
        path: "wallet",
        element: <AdminWallet />,
      },
      {
        path: "packages",
        element: <AdminPackages />,
      },
      {
        path: "devices",
        element: <AdminDevices />,
      },
      {
        path: "orders",
        children: [
          {
            path: "",
            element: <AdminOrders />,
          },
          {
            path: ":orderId",
            element: <AdminOrderDetails />,
          },
        ],
      },
      {
        path: "staff",
        children: [
          {
            path: "",
            element: <AdminStaff />,
          },
          {
            path: "add",
            element: <AdminAddStaff />,
          },
        ],
      },
      {
        path: "settings",
        element: <AdminSettings />,
      },
    ],
  },
  {
    path: "admin-staff",
    element: <Layout sidebarType="admin-staff" />,
    children: [
      {
        path: "",
        element: <AdminStaffOrders />,
      },
    ],
  },
  {
    path: "*",
    element: <_404 />,
  },
  {
    path: "/login-test",
    element: <LoginTest />,
  },
]);

export default Router;

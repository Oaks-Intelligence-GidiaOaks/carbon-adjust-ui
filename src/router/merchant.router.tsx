import Layout from "@/layouts/Layout";
import SalesLayout from "@/layouts/SalesLayout";
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
import Inventory from "@/pages/protected/merchant/Inventory";
import ManagePackageSchedule from "@/pages/protected/merchant/ManagePackageSchedule";
import Sales from "@/pages/protected/merchant/Sales";

export const merchantRoutes = [
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
        path: "sales",
        element: <SalesLayout />,
        children: [
          {
            path: "",
            element: <Sales />,
          },
        ],
      },
      {
        path: "inventory",
        element: <SalesLayout />,
        children: [
          {
            path: "",
            element: <Inventory />,
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
];

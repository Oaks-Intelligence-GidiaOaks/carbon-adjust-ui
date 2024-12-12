import BuildingList from "@/components/containers/buildings/BuildingList";
import AssetsLayout from "@/layouts/AssetsLayout";
import Layout from "@/layouts/Layout";
import UnitsLayout from "@/layouts/UnitsLayout";
import { UserDevices, UserNewDevice, UserNewTransport, UserPurchases } from "@/pages/protected/home-occupant";
import {
  OrganizationDevices,
  OrganisationDashboard,
  OrganisationNewStaff,
  OrganisationNewUnit,
  OrganisationProfile,
  OrganisationRequests,
  OrganisationStaff,
  OrganisationStaffRequestDetails,
  OrganisationUnit,
  OrganisationWallet,
  OrganizationTransport,
} from "@/pages/protected/organisation";

export const organisationRoutes = [
  {
    path: "/organisation",
    element: <Layout sidebarType="organisation" />,
    children: [
      {
        path: "",
        element: <OrganisationDashboard />,
      },
      {
        path: "units",
        element: <UnitsLayout />,
        children: [
          {
            path: "",
            element: <OrganisationUnit />,
          },
          {
            path: "new",
            element: <OrganisationNewUnit />,
          },
        ],
      },
      {
        path: "staff",
        element: <UnitsLayout />,
        children: [
          {
            path: "",
            element: <OrganisationStaff />,
          },
          {
            path: "new",
            element: <OrganisationNewStaff />,
          },
        ],
      },
      {
        path: "devices",
        element: <AssetsLayout type="organization"/>,
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
        path: "buildings",
        element: <AssetsLayout type="organization"/>,
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
            element: <OrganizationTransport />,
          },
          {
            path: "add",
            element: <UserNewTransport />,
          },
        ],
      },
      {
        path: "purchases",
        element: <AssetsLayout />,
        children: [
          {
            path: "",
            element: <UserPurchases />,
          },
        ],
      },
      {
        path: "wallet",
        element: <OrganisationWallet />,
      },
      {
        path: "profile",
        element: <OrganisationProfile />,
      },
      {
        path: "requests",
        children: [
          {
            path: "",
            element: <OrganisationRequests />,
          },
          {
            path: ":requestId",
            element: <OrganisationStaffRequestDetails />,
          },
        ],
      },
    ],
  },
];

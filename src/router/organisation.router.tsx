import BuildingList from "@/components/containers/buildings/BuildingList";
import AssetsLayout from "@/layouts/AssetsLayout";
import Layout from "@/layouts/Layout";
import {
  OrganizationDevices,
  OrganisationDashboard,
  OrganisationDepartment,
  OrganisationProfile,
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
        path: "departments",
        element: <OrganisationDepartment />,
      },
      {
        path: "devices",
        element: <AssetsLayout type="organization"/>,
        children: [
          {
            path: "",
            element: <OrganizationDevices />,
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
          // {
          //   path: "add",
          //   element: <UserNewTransport />,
          // },
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
    ],
  },
];

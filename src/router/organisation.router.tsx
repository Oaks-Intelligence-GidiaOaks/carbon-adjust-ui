import Layout from "@/layouts/Layout";
import {
  OrganisationAssets,
  OrganisationDashboard,
  OrganisationDepartment,
  OrganisationProfile,
  OrganisationWallet,
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
        path: "assets",
        element: <OrganisationAssets />,
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

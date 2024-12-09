import Layout from "@/layouts/Layout";
import UnitsLayout from "@/layouts/UnitsLayout";
import {
  OrganisationAssets,
  OrganisationDashboard,
  OrganisationNewUnit,
  OrganisationProfile,
  OrganisationUnit,
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

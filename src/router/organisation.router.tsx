import Layout from "@/layouts/Layout";
import UnitsLayout from "@/layouts/UnitsLayout";
import {
  OrganisationAssets,
  OrganisationDashboard,
  OrganisationNewStaff,
  OrganisationNewUnit,
  OrganisationProfile,
  OrganisationRequests,
  OrganisationStaff,
  OrganisationStaffRequestDetails,
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

import AssetsLayout from "@/layouts/AssetsLayout";
import Layout from "@/layouts/Layout";

import {
  OrganisationDashboard,
  OrganisationProfile,
  OrganisationRequests,
  OrganisationStaffRequestDetails,
  OrganisationWallet,
  OrganizationDevices,
  OrganizationNewDevice,
  OrganizationPurchases,
} from "@/pages/protected/organisation";

export const organisationStaffRoutes = [
  {
    path: "/organisation-staff",
    element: <Layout sidebarType="organisationStaff" />,
    children: [
      {
        path: "",
        element: <OrganisationDashboard />,
      },
    //   {
    //     path: "units",
    //     element: <UnitsLayout />,
    //     children: [
    //       {
    //         path: "",
    //         element: <OrganisationUnit />,
    //       },
    //       {
    //         path: "new",
    //         element: <OrganisationNewUnit />,
    //       },
    //     ],
    //   },
    //   {
    //     path: "staff",
    //     element: <UnitsLayout />,
    //     children: [
    //       {
    //         path: "",
    //         element: <OrganisationStaff />,
    //       },
    //       {
    //         path: "new",
    //         element: <OrganisationNewStaff />,
    //       },
    //     ],
    //   },
      {
        path: "devices",
        element: <AssetsLayout type="organization"/>,
        children: [
          {
            path: "",
            element: <OrganizationDevices />,
          },
          {
            path: "add",
            element: <OrganizationNewDevice />,
          },
          {
            path: ":deviceId/edit",
            element: <OrganizationNewDevice />,
          },
        ],
      },
    //   {
    //     path: "buildings",
    //     element: <AssetsLayout type="organization"/>,
    //     children: [
    //       {
    //         path: "",
    //         element: <BuildingList />,
    //       },
    //     ],
    //   },
    //   {
    //     path: "transport",
    //     element: <AssetsLayout />,
    //     children: [
    //       {
    //         path: "",
    //         element: <OrganizationTransport />,
    //       },
    //       {
    //         path: "add",
    //         element: <OrganizationNewTransport />,
    //       },
    //     ],
    //   },
      {
        path: "purchases",
        element: <AssetsLayout />,
        children: [
          {
            path: "",
            element: <OrganizationPurchases />,
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

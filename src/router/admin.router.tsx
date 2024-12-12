import Layout from "@/layouts/Layout";
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

export const adminRoutes = [
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
];

import Layout from "@/layouts/Layout";
import { MerchantOrderDetails } from "@/pages/protected/merchant";
import { StaffApplications, StaffDashboard } from "@/pages/protected/staff";
import { AdminStaffOrders } from "@/pages/protected/staffAdmin";

export const staffRoutes = [
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
];

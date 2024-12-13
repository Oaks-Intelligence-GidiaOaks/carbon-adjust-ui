import Layout from "@/layouts/Layout";
import Market from "@/pages/protected/home-occupant/Market";
import {
  UserAppointment,
  UserCart,
  UserCheckout,
  UserDevices,
  UserFavorites,
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
import AssetsLayout from "@/layouts/AssetsLayout";
import BuildingList from "@/components/containers/buildings/BuildingList";
import Payment from "@/pages/protected/home-occupant/Payment";
import PaymentSuccess from "@/components/containers/checkout/PaymentSuccess";

export const homeOwnerRoutes = [
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
        path: "cart",
        element: <UserCart />,
      },
      {
        path: "favourites",
        element: <UserFavorites />,
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
];

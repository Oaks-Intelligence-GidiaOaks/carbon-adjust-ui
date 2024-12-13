import { Calendar, Home, Login, Register, _404 } from "@/pages/public";
import PendingVerification from "@/pages/protected/shared/PendingVerification";
import DashboardLanding from "@/pages/protected/shared/DashboardLanding";
import TermsAndConditions from "@/pages/public/TermsAndConditions";
import MerchantTermsAndConditions from "@/pages/public/MerchantTermsAndConditions";
import PrivacyPolicy from "@/pages/public/PrivacyPolicy";
import ForgotPassword from "@/pages/public/ForgotPassword";
import ResetPassword from "@/pages/public/ResetPassword";
import MerchantRegister from "@/pages/public/MerchantRegister";
import AccountSetup from "@/pages/protected/shared/account-setup/AccountSetup";
import LoginTest from "@/pages/public/Login_test";
import RegisterOrganisation from "@/pages/public/RegisterOrganisation";

export const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
  },
  {
    path: "/terms-and-conditions/merchant",
    element: <MerchantTermsAndConditions />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/calendar",
    element: <Calendar />,
  },
  {
    path: "/home",
    element: <DashboardLanding />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/merchant/register",
    element: <MerchantRegister />,
  },
  {
    path: "/organisation/register",
    element: <RegisterOrganisation />,
  },
  {
    path: "/account-setup",
    element: <AccountSetup />,
  },
  {
    path: "/pending-verification",
    element: <PendingVerification />,
  },
  {
    path: "*",
    element: <_404 />,
  },
  {
    path: "/login-test",
    element: <LoginTest />,
  },
];

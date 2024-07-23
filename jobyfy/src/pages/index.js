import Login from "../pages/login.js";
import SignUp from "../pages/sign-up.js";
import Home from "../pages/dashboard.js";
import Service from "./category.js";
import Profile from "../pages/profile.js";
import Payment from "../pages/payment.js";
import ServiceSubscription from "../pages/service-subscription.js";
import Page404 from "../pages/no-data-found.js";

const routes = [
  {
    path: "/",
    pages: () => <Home />,
  },
  {
    path: "/login",
    pages: () => <Login />,
    isPublic: true,
  },
  {
    path: "/signup",
    pages: SignUp,
    isPublic: true,
  },

  {
    path: "/service",
    pages: Service,
    requiredPermission: "manage_services",
  },

  {
    path: "/profile",
    pages: Profile,
  },
  {
    path: "/payment",
    pages: Payment,
    requiredPermission: "manage_payments",
  },
  {
    path: "/service-subscription",
    pages: ServiceSubscription,
  },

  {
    path: "*",
    pages: Page404,
  },
];

export default routes;

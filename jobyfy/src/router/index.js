import Login from "../pages/login.js";
import SignUp from "../pages/sign-up.js";
import Home from "../pages/dashboard.js";
import Profile from "../pages/profile.js";
import Page404 from "../pages/no-data-found.js";
import Company from "../pages/company.js";
import mainJob from "../pages/mainJob.js";

const routes = [
  {
    path: "/",
    pages: () => <Home />,
    isPublic: true,
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
    path: "/company",
    pages: Company,
    requiredPermission: "manage_users",
  },
  {
    path: "/jobs",
    pages: mainJob,
    requiredPermission: "manage_users",
  },

  {
    path: "/profile",
    pages: Profile,
  },
  {
    path: "*",
    pages: Page404,
  },
];

export default routes;

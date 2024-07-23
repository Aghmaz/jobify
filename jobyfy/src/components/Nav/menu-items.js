import { Svgs } from "../Svgs/svg-icons";

export const menuItems = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: Svgs.dashboard,
    link: "/",
    className: "item__hover sideBarLinks",
  },
  {
    label: "Management",
    key: "management",
    icon: Svgs.servicecategory,
    className: "item__hover sideBarLinks",
    children: [
      {
        label: "Company",
        key: "company",
        link: "/company",
        className: "item__hover sideBarLinks",
        icon: Svgs.ellipse,
      },
      {
        label: "Jobs",
        key: "jobs",
        link: "/jobs",
        className: "item__hover sideBarLinks",
        icon: Svgs.ellipse,
      },
    ],
  },
];

import { ADMIN_TYPE_VALUE } from "../constants";

export const getAdminTypeName = (type) => {
  return ADMIN_TYPE_VALUE[type];
};

export const ROLES = {
  ADMIN: "Super Admin",
  CLIENT: "Client",
  VENDOR: "Vendor",
  SUB_ADMIN: "Sub Admin",
  LOGISTIC_SUB_ADMIN: "Logistic Sub Admin",
};

export const ROLES_TYPES = {
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",  
  VENDOR: "VENDOR",
  SUB_ADMIN: "SUB_ADMIN",
  LOGISTIC_SUB_ADMIN: "LOGISTIC_SUB_ADMIN",
};

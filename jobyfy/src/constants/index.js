export const getUserId = () => Number(localStorage.getItem("userId"));

export const ADMIN_TYPE = {
  LOGISTIC_SUB_ADMIN: "LOGISTIC_SUB_ADMIN",
  SUB_ADMIN: "SUB_ADMIN",
};

export const ADMIN_TYPE_VALUE = {
  LOGISTIC_SUB_ADMIN: "Logistic Sub Admin",
  SUB_ADMIN: "Sub Admin",
};

export const SUPER_ADMIN_TYPE = "ADMIN";
export const SUPER_ADMIN_ID = 1;
export const VENDOR_ROLE_ID = 3;

export const getUserRole = (user, role) => {
  if (role === "vendor") {
    return user?.role?.id === 3;
  }
  if (role === "admin") {
    return user?.role?.id === 1;
  }
  if (role === "client") {
    return user?.role?.id === 2;
  }
  if (role === "subAdmin") {
    return user?.role?.id === 4;
  }
  if (role === "logisticAdmin") {
    return user?.role?.id === 5;
  }
};

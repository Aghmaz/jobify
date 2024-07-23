import axios from "../config/Axios";

export const fetchCompanies = () => {
  return axios.get("/api/companies");
};

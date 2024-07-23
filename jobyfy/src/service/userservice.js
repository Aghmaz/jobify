import axios from "../config/Axios";

export const fetchUsers = () => {
  return axios.get("/user");
};

export const fetchUser = (id) => {
  return axios.get(`/user/${id}`);
};

export const createUser = async (userData) => {
  return await axios.post("/api/auth/signup", userData);
};

export const loginUser = ({ email, password }) => {
  return axios.post("/api/auth/login", { email, password });
};

export const createCompany = async (userData) => {
  return await axios.post("/api/companies", userData);
};

export const updateCompany = ({ id, userData }) => {
  return axios.put(`/api/companies/${id}`, userData);
};

export const deleteCompany = (id) => {
  return axios.delete(`/api/companies/${id}`);
};

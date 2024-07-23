import axios from "../config/Axios";

export const fetchJobs = () => {
  return axios.get("/api/jobs");
};

export const createJob = async (userData) => {
  return await axios.post("/api/jobs/", userData);
};

export const updateJob = ({ id, userData }) => {
  return axios.put(`/api/jobs/${id}`, userData);
};

export const deleteJob = (id) => {
  return axios.delete(`/api/jobs/${id}`);
};

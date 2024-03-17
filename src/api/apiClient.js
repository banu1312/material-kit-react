/* eslint-disable import/no-cycle */
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { 
  deleteUserInfo, 
  getAccessToken ,
  deleteAccessToken, 
} from "./auth";

const navigate = useNavigate

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL ?? "http://localhost:8080/"}api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
});


apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 403) {
      deleteAccessToken();
      deleteUserInfo()
      return Promise.reject();
    }

    return Promise.reject(err);
  }
);

export default apiClient;

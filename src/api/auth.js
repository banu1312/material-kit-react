// eslint-disable-next-line import/no-cycle
import apiClient from "./apiClient";

export function getAccessToken() {
    return localStorage.getItem("user-token");
  }
  
  export function putAccessToken(accessToken) {
    return localStorage.setItem("user-token", accessToken);
  }
  
  export function deleteAccessToken() {
    localStorage.removeItem("user-token");
  }
  
  export function getUserInfo() {
    return localStorage.getItem("user-info");
  }
  
  export function putUserInfo(userInfo) {
    const userInfoString = JSON.stringify(userInfo);
    return localStorage.setItem("user-info", userInfoString);
  }
  
  export function deleteUserInfo() {
    localStorage.removeItem("user-info");
  }

  export async function login({ email, password }) {
    try {
      const { data } = await apiClient.post("/auth/login", { email, password });
  
      return { error: false, data };
    } catch (e) {
      return { error: true, data: e};
    }
  }

export async function register({ email, password, name, birthDay, role_id,phone }) {
    try {
      await apiClient.post("/auth/register", {email, password, name, birthDay, role_id,phone });
  
      return { error: false };
    } catch (e) {
      return { error: true, data: e.response.data.message };
    }
  }
  
export async function getUserLogged() {
    try {
      const { data } = await apiClient.get("/user/me");
  
      return { error: false, data: data.data };
    } catch (e) {
      return { error: true, data: e };
    }
  }
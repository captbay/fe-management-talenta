import { axios } from "./axios";

// auth
export const login = (username, password) => {
  return axios.post("/auth/login", { username, password });
};

export const logout = (token) => {
  return axios.get("/auth/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

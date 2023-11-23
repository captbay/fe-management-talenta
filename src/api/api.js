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

// get profile
export const getProfile = (token) => {
  return axios.get("/auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// update profile
export const updateProfile = (token, data) => {
  return axios.put("/auth/user", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// CRUD dosen
export const getDosen = (token) => {
  return axios.get("/dosen", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDosenById = (token, id) => {
  return axios.get(`/dosen/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// CRUD pegawai
export const getPegawai = (token) => {
  return axios.get("/pegawai", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPegawaiById = (token, id) => {
  return axios.get(`/pegawai/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// get graph

// graph for prodi
export const getProdi = (token) => {
  return axios.get("/graph/count-prodi", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getKelompokKeahlian = (token) => {
  return axios.get("/graph/count-kelompok-keahlian", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getJabatan = (token) => {
  return axios.get("/graph/count-jabatan-fungsional", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getStatus = (token) => {
  return axios.get("/graph/count-status", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// import axios from "axios";

// const axiosBase = axios.create({
//   baseURL: "http://localhost:5500/api",
// });

// export default axiosBase;

import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:5500/api",
});

axiosBase.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosBase;

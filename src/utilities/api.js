import axios from "axios";
// https://examino-backend.onrender.com/
// "http://localhost:7070"
// "http://localhost:7070"
const request = axios.create({
  baseURL: "https://examino-backend.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    crossdomain: true,
  },
});

request.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");
  if (token) {
    config.headers["x-access-token"] = `${token}`;
  }
  return config;
});

export default request;

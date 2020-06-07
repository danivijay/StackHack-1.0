import axios from "axios";

const getToken = () => localStorage.getItem("token");

const api = () => {
  const params = { baseURL: "https://localhost:4000/api/v1" };
  const token = getToken();
  if (token) {
    params.headers = {
      Authorization: token,
    };
  }

  const instance = axios.create({
    params,
  });
  return instance;
};

export default api;

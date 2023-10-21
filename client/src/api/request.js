import axios from "axios";

const serverUri = "https://0.0.0.0:10000";

const request = (accessToken) => {
  return axios.create({
    baseURL: serverUri + "/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export default request;

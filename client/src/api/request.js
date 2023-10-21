import axios from "axios";

const serverUri = "http://localhost:4091";

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

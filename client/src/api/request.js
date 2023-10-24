import axios from "axios";

const serverHostname = "";
const serverPort = 4091;

const serverUri = `https://${serverHostname}:${serverPort}`;

const request = (accessToken) => {
  console.log("sending request to: " + serverUri);
  return axios.create({
    baseURL: serverUri + "/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export default request;

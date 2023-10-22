import axios from "axios";

const serverHostname = "0.0.0.0"; // Replace with your Render app's domain
const serverPort = 443; // Use 443 for HTTPS

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

import axios from "axios";

const serverHostname = "127.0.0.1"; // Replace with your Render app's domain
const serverPort = 4091; // Use 443 for HTTPS

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

import axios from "axios";

const serverHostname = "web2lab1-lacz.onrender.com"; // Replace with your Render app's domain
const serverPort = 443; // Use 443 for HTTPS

const serverUri = `https://${serverHostname}:${serverPort}/api`;

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

import axios from "axios";

const serverHostname = "web2lab1-888d.onrender.com"; // Replace with your Render app's domain
const serverPort = 3000; // Use 443 for HTTPS

const serverUri = `http://${serverHostname}`; //:${serverPort}`;

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

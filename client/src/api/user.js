import { extractData } from "./helpers.js";
import request from "./request.js";

const urls = {
  root: "/user",
  get fetchUserData() {
    return this.root + "";
  },
  get login() {
    return this.root + "/login";
  },
};

const fetchUserData = async (token) => {
  const customRequest = request(token);
  return await customRequest.get(urls.fetchUserData).then(extractData);
};

const login = async (token) => {
  console.log("Sending request to login api");
  const customRequest = request(token);
  const res = await customRequest.post(urls.login, { token });
  return extractData(res);
};

export default { fetchUserData, login };

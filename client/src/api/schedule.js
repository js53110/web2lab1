import { extractData } from "./helpers.js";
import request from "./request.js";

const urls = {
  root: "/schedule",
  get insert() {
    return this.root + "/insert";
  },
  get update() {
    return this.root + "/update";
  },
};

const insert = async (token, fixture) => {
  const customRequest = request(token);
  const res = await customRequest.post(urls.insert, { fixture });
  return extractData(res);
};

const update = async (token, fixture) => {
  const customRequest = request(token);
  const res = customRequest.post(urls.update, { fixture });
  return extractData(res);
};

export default { insert, update };

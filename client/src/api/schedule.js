import { extractData } from "./helpers.js";
import request from "./request.js";

const urls = {
  root: "/schedule",
  get insert() {
    return this.root + "/insert";
  },
};

const insert = async (token, fixture) => {
  const customRequest = request(token);
  return await customRequest.post(urls.insert, { fixture });
};

export default { insert };

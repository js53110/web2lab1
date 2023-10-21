import { extractData } from "./helpers.js";
import request from "./request.js";

const urls = {
  root: "/tournaments",
  get insert() {
    return this.root + "/insert";
  },
  get fetchAll() {
    return this.root + "/all";
  },
  fetchUserTournaments(id) {
    return `${this.root}/user/${id}`;
  },
  fetchById(id) {
    return `${this.root}/${id}`;
  },
};

const insert = (token, tournament, competitors) => {
  const customRequest = request(token);
  return customRequest.post(urls.insert, { tournament, competitors });
};

const fetchAll = async (token) => {
  const customRequest = request(token);
  const res = await customRequest.get(urls.fetchAll);
  return extractData(res);
};

const fetchUserTournaments = async (token, id) => {
  const customRequest = request(token);
  const res = await customRequest.get(urls.fetchUserTournaments(id));
  return extractData(res);
};

const fetchById = async (token, id) => {
  const customRequest = request(token);
  const res = await customRequest.get(urls.fetchById(id));
  return extractData(res);
};

export default { insert, fetchAll, fetchUserTournaments, fetchById };

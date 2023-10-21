import express, { Router } from "express";
import { auth } from "express-oauth2-jwt-bearer"; //claimCheck, requireScope, ...

import {
  insert,
  fetchAll,
  fetchByUser,
  fetchById,
} from "./tournament.controller";

const jwtCheck = auth({
  audience: "https://js53110.com", // Audience should match your Auth0 API
  issuerBaseURL: "https://js53110.eu.auth0.com",
  tokenSigningAlg: "RS256",
});

const router = Router();
const path = "/tournaments";

router
  .post("/insert", jwtCheck, insert)
  .get("/all", jwtCheck, fetchAll)
  .get("/user/:id", jwtCheck, fetchByUser)
  .get("/:id", fetchById);

export default { path, router };

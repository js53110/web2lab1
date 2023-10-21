import { Router } from "express";
import { insert } from "./schedule.controller";
import { auth } from "express-oauth2-jwt-bearer"; //claimCheck, requireScope, ...

const router = Router();
const path = "/schedule";

const jwtCheck = auth({
  audience: "https://js53110.com", // Audience should match your Auth0 API
  issuerBaseURL: "https://js53110.eu.auth0.com",
  tokenSigningAlg: "RS256",
});

router.post("/insert", jwtCheck, insert);

export default { path, router };

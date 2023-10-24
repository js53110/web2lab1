import { login } from "./user.controller";
import { Router } from "express";
import { auth } from "express-oauth2-jwt-bearer"; //claimCheck, requireScope, ...

const router = Router();
const path = "/user";

const jwtCheck = auth({
  audience: "https://js53110.com", // Audience should match your Auth0 API
  issuerBaseURL: "https://js53110.eu.auth0.com",
  tokenSigningAlg: "RS256",
});

const log = () => {
  console.log("IN LOGIN");
};

router.post("/login", log, login);

export default { path, router };

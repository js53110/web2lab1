import config from "../configs/auth_config.js";
import { createAuth0Client } from "@auth0/auth0-spa-js";
import { authStore } from "./stores/index.js";

let auth0 = null;
const configureClient = async () => {
  auth0 = await createAuth0Client({
    domain: config.domain,
    clientId: config.clientId,
    authorizationParams: {
      audience: config.audience,
    },
  });
  return auth0;
};

const login = async (auth0) => {
  await auth0.loginWithRedirect({
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  });
};

const logout = async (auth0) => {
  await auth0.logout({
    returnTo: window.location.origin,
  });
  authStore.user.set(null);
};

export default { configureClient, login, logout };

import Home from "./components/home/Home.svelte";
import Redirect from "./components/redirect/Redirect.svelte";
import CreateTournament from "./components/tournament/CreateTournament.svelte";
import TournamentPublic from "./components/tournament/TournamentPublic.svelte";
import { isLoggedIn } from "./stores/auth.js";
import { isRoute, isUserRoute, redirect } from "./utils/router/routing.js";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    isUser: false,
  },

  {
    path: "/tournament/new",
    name: "CreateTournament",
    component: CreateTournament,
    isUser: true,
  },

  {
    path: "/tournament/:id",
    name: "TournamentPublic",
    component: TournamentPublic,
    isUser: false,
  },

  {
    path: "/redirect",
    name: "Redirect",
    component: Redirect,
    isUser: false,
  },
];

const beforeRoute = async () => {
  console.log("beforeRoute function is executed");
  if (!isRoute()) {
    console.log("Not a valid route, redirecting to Home");
    return redirect("Redirect");
  }

  if (isUserRoute() && !isLoggedIn()) {
    console.log("User is not logged in, redirecting to Home");
    return redirect("Redirect");
  }
};

export default routes;
export { beforeRoute };

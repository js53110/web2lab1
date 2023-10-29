<script>
  import { onMount } from "svelte";
  import authService from "../../authService.js";
  import { tournamentApi, userApi } from "../../api/index.js";
  import { authStore } from "../../stores/index.js";
  import TournamentView from "../tournament/TournamentView.svelte";

  let loginText = "Login";
  let isAuthenticated = false;
  let auth0 = null;
  let user;
  $: isLoaded = false;

  let userTournaments = [];

  let tournamentName;
  let competitors;
  let pointsSystem;
  let numOfCompetitors;
  let tournamentsLoaded = false;

  function handleSubmit(event) {
    event.preventDefault();
    competitors = competitors.split(";").map((competitor) => competitor.trim());
    numOfCompetitors = competitors.length;

    const tournament = {
      tournamentname: tournamentName,
      pointssystem: pointsSystem,
      numofcompetitors: numOfCompetitors,
      creatorid: user.id,
    };
    isLoaded = false;

    (async () => {
      tournamentApi.insert(
        await auth0.getTokenSilently(),
        tournament,
        competitors
      );
    })().then(() => {
      tournamentName = "";
      numOfCompetitors = "";
      pointsSystem = "";
      competitors = null;
      setTimeout(() => {
        isLoaded = true;
      }, 1000);
    });
  }

  onMount(async () => {
    auth0 = await authService.configureClient();
    isAuthenticated = await auth0.isAuthenticated();
    const query = window.location.search;

    if (await auth0.isAuthenticated()) {
      user = await userApi.login(await auth0.getTokenSilently());
      await updateUI();
      return;
    } else if (query.includes("code=") && query.includes("state=")) {
      user = await userApi.login(await auth0.getTokenSilently());

      await auth0.handleRedirectCallback();

      authStore.user.set(user);

      await updateUI();
      window.history.replaceState({}, document.title, "/");
    } else {
      isLoaded = true;
    }
  });

  const handleLogin = () => {
    !isAuthenticated ? login() : logout();
  };
  async function login() {
    isLoaded = false;
    await authService.login(auth0);
  }
  async function logout() {
    isLoaded = false;
    setTimeout(() => {}, 1000);
    authStore.user.set(null);
    await authService.logout(auth0);
  }

  const updateUI = async () => {
    isAuthenticated = await auth0.isAuthenticated();
    loginText = isAuthenticated ? "Logout" : "Login";
    isLoaded = true;
  };

  const displayData = () => {
    console.log(user);
  };

  const loadUserTournaments = async () => {
    userTournaments = await tournamentApi.fetchUserTournaments(
      await auth0.getTokenSilently(),
      user.id
    );
    userTournaments = userTournaments.tournaments;
    tournamentsLoaded = true;
  };
</script>

<main>
  {#if isLoaded}
    <h1>Hello! {user ? user.username : ""}</h1>
    <div class="buttons">
      <button on:click={handleLogin}>{loginText}</button>
    </div>
    {#if isAuthenticated}
      <form on:submit={handleSubmit}>
        <label for="tournamentName">Tournament Name:</label>
        <input
          type="text"
          id="tournamentName"
          bind:value={tournamentName}
          required
        />

        <label for="competitors">Competitors (Separated by semicolons):</label>
        <textarea id="competitors" bind:value={competitors} required />

        <label for="pointsSystem">Points System:</label>
        <input
          type="text"
          id="pointsSystem"
          bind:value={pointsSystem}
          required
        />

        <button type="submit">Submit</button>
      </form>
      <button on:click={loadUserTournaments}>Load Tournaments</button>
      {#if tournamentsLoaded}
        {#each userTournaments as tournament}
          <TournamentView {tournament} {auth0} />
        {/each}
      {/if}
    {/if}
  {:else}
    <p>Loading...</p>
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: top;
    align-items: center;
    width: 100vw;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  form {
    margin: 20px;
    padding: 10px 0 0 0;
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }

  label {
    font-weight: bold;
  }

  input,
  textarea {
    width: 70%;
    padding: 8px;
    margin: 6px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button[type="submit"] {
    width: 100%;
    padding: 10px;
    margin: 20px 0 0 0;
    background-color: #ff3e00;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button[type="submit"]:hover {
    background-color: #8c2300;
  }

  @media (min-width: 640px) {
  }
</style>

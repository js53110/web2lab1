<script>
  import { onMount } from "svelte";
  import authService from "../../authService.js";
  import { userApi } from "../../api/index.js";
  import { redirect } from "../../utils/router/routing.js";

  let loginText = "Logout";
  let isAuthenticated = false;
  let auth0 = null;
  let user;
  $: isLoaded = false;

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

      await updateUI();
      window.history.replaceState({}, document.title, "/");
    } else {
      isLoaded = true;
    }
  });

  const updateUI = async () => {
    isAuthenticated = await auth0.isAuthenticated();
    loginText = isAuthenticated ? "Logout" : "Login";
    isLoaded = true;
  };

  async function logout() {
    isLoaded = false;
    setTimeout(() => {}, 1000);
    await authService.logout(auth0);
  }
</script>

<main>
  {#if isLoaded}
    <h1>Hello! {user ? user.username : ""}</h1>
    <div class="buttons">
      <button on:click={logout}>{loginText}</button>
      {#if isAuthenticated}
        <button on:click={() => redirect("CreateTournament")}>Data</button>
      {/if}
    </div>
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
    width: 100%;
    height: 100%;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
  }
</style>

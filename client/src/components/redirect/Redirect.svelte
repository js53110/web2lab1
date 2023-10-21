<script>
  import { onMount } from "svelte";
  import { redirect } from "../../utils/router/routing.js";

  onMount(() => {
    setTimeout(() => {
      redirect("Home");
    }, 1000);
  });
</script>

<main>
  <p>Redirecting...</p>
</main>

<style>
  p {
    text-align: center;
  }
</style>

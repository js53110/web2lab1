<script>
  import Schedule from "./Schedule.svelte";

  export let tournament;
  export let auth0;
  let expandText = "Expand";
  let expand = false;
  let schedules = tournament.schedules;
  schedules.sort((a, b) => a.id - b.id);
  let displayBonusActions = true;

  var root = location.protocol + "//" + location.host;

  const handleExpand = () => {
    expand = !expand;
    expandText = expand ? "Collapse" : "Expand";
  };
</script>

<main>
  <div class="tournament-container">
    <div class="tournament-header">
      <p class="tournament-name">{tournament.tournamentname} Schedule</p>
      <button class="expand" on:click={handleExpand}>{expandText}</button>
    </div>
    <a class="link" href={`${root}/tournament/${tournament.id}`}
      >{root}/tournament/{tournament.id}</a
    >
    {#if expand}
      {#each schedules as schedule}
        <Schedule {schedule} {displayBonusActions} {auth0} />
      {/each}
    {/if}
  </div>
</main>

<style>
  main {
    margin: 20px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .tournament-header {
    width: 100%;
    position: relative;
  }
  .expand {
    position: absolute;
    top: 2px;
    right: 2px;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tournament-container {
    display: flex;
    flex-direction: column;
    width: 70%;
    align-items: center;
    border: 1px solid white;
    border-radius: 5px;
  }
  .tournament-name {
    background-color: #ff3e00;
    width: 100%;
    margin: 0;
    text-align: center;
    font-size: 1.5em;
    border-radius: 5px;
  }
</style>

<script>
  import { onMount } from "svelte";
  import Schedule from "./Schedule.svelte";
  import { tournamentApi } from "../../api/index.js";

  let tournament = {};
  let schedules = [];
  let standings = [];
  let loaded = false;
  onMount(async () => {
    const url = new URL(window.location.href);
    const pathname = url.pathname;
    const parts = pathname.split("/");
    const id = parts[parts.length - 1];
    const res = await tournamentApi.fetchById("", id);
    tournament = res.tournament;

    schedules = tournament.schedules;
    schedules.sort((a, b) => a.id - b.id);

    const pointsSystem = tournament.pointssystem;

    const pointsWin = pointsSystem.split("/")[0];
    const pointsDraw = pointsSystem.split("/")[1];

    tournament.competitors.forEach((competitor) => {
      const standing = {
        name: competitor.name,
        playedmatches: competitor.playedmatches,
        wins: competitor.wins,
        points: competitor.wins * pointsWin + competitor.draws * pointsDraw,
      };
      standings.push(standing);
    });
    standings.sort((a, b) => b.points - a.points);
    console.log(standings);
    loaded = true;
  });

  let displayBonusActions = false;
</script>

<main>
  {#if loaded}
    <div class="standings">
      <div class="header">
        <p class="text">Team</p>
        <p class="numbers">Played</p>
        <p class="numbers">Wins</p>
        <p class="numbers">Points</p>
      </div>
      <hr>
      {#each standings as standing (standing.name)}
        <div class="standing">
          <p class="text">{standing.name}</p>
          <p class="numbers">{standing.playedmatches}</p>
          <p class="numbers">{standing.wins}</p>
          <p class="numbers">{standing.points}</p>
        </div>
        <hr />
      {/each}
    </div>
    <div class="tournament-container">
      <div class="tournament-header">
        <p class="tournament-name">{tournament.tournamentname} Schedule</p>
      </div>

      {#each schedules as schedule}
        <Schedule {schedule} {displayBonusActions} />
      {/each}
    </div>
  {/if}
</main>

<style>
  main {
    margin: 20px;
    width: 100%;
    padding: 0;
    margin: 10px 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .tournament-header {
    width: 100%;
    position: relative;
  }
  p {
    margin: 0;
  }
  .standings {
    border: 1px solid #ff3e00;
    border-radius: 5px;
    width: 40%;
    margin-bottom: 20px;
    padding: 10px;
  }

  .numbers {
    text-align: center;
  }

  .standing,
  .header {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr;
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

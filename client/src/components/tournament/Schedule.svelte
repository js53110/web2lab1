<script>
  import { fly, scale, slide } from "svelte/transition";
  import { scheduleApi } from "../../api/index.js";

  export let schedule;
  export let displayBonusActions = false;
  export let auth0 = null;
  let saveButton = false;
  let buttonText = "";
  let score = schedule.score ? schedule.score.split("-") : null;
  let scorep1 = score ? score[0] : null;
  let scorep2 = score ? score[1] : null;

  const updateScore = () => {
    if (!schedule.played) {
      if (scorep1 != undefined && scorep2 != undefined) {
        buttonText = "Save";
        saveButton = !saveButton;
      } else {
        saveButton = false;
      }
    } else if (schedule.played) {
      if (scorep1 != undefined && scorep2 != undefined) {
        saveButton = !saveButton;
        buttonText = "Update";
      } else {
        saveButton = false;
      }
    }
  };

  const saveScore = async () => {
    let fixture;
    if (schedule.played) {
      fixture = {
        id: schedule.id,
        player1: schedule.player1,
        player2: schedule.player2,
        score: scorep1 + "-" + scorep2,
        tournamentid: schedule.tournamentid,
        played: true,
      };
      await scheduleApi.update(await auth0.getTokenSilently(), fixture);
      buttonText = "Saving";
      setTimeout(() => {
        saveButton = !saveButton;
      }, 1000);
    } else {
      fixture = {
        id: schedule.id,
        player1: schedule.player1,
        player2: schedule.player2,
        score: scorep1 + "-" + scorep2,
        tournamentid: schedule.tournamentid,
        played: true,
      };
      await scheduleApi.insert(await auth0.getTokenSilently(), fixture);
      buttonText = "Saving";
      setTimeout(() => {
        saveButton = !saveButton;
      }, 1000);
    }
    window.location.reload();
  };
</script>

<main>
  <div class="fixture-view">
    <p class="name">{schedule.player1}</p>
    <input
      on:keyup={updateScore}
      class="score"
      type="number"
      bind:value={scorep1}
      readonly={!displayBonusActions}
    />
    <p>-</p>
    <input
      on:keyup={updateScore}
      class="score"
      type="number"
      bind:value={scorep2}
      readonly={!displayBonusActions}
    />
    <p class="name">{schedule.player2}</p>
  </div>
  {#if displayBonusActions && saveButton}
    <div class="bonusActions" in:slide out:slide>
      <button on:click={saveScore}>{buttonText}</button>
    </div>
  {/if}
</main>

<style>
  main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .fixture-view {
    width: 90%;
    border: 2px solid #ff3e00;
    border-radius: 5px;
    margin: 10px 0px 0px 0px;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
    justify-items: center;
  }

  .score {
    width: 90%;
    margin: 5px 0;
    text-align: center;
    font-size: 1.5rem;
  }
  .name {
    font-weight: 600;
    font-size: 1.1em;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .bonusActions {
    width: 35%;
    border-left: 1px solid #ff3e00;
    border-right: 1px solid #ff3e00;
    border-bottom: 1px solid #ff3e00;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    margin: 5px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button:hover {
    border-color: #ff3e00;
  }
</style>

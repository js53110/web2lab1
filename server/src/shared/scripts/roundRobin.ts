const roundRobin = (
  teams: string[]
): Array<Array<string | [string, string]>> => {
  let schedule: Array<Array<string | [string, string]>> = [];
  let league: string[] = teams.slice();

  if (league.length % 2) {
    league.push("None");
  }

  let rounds = league.length;

  for (let j = 0; j < (rounds - 1) * 2; j++) {
    schedule[j] = [];
    for (let i = 0; i < rounds / 2; i++) {
      if (league[i] !== "None" && league[rounds - 1 - i] !== "None") {
        if (j % 2 === 1) {
          schedule[j].push([league[i], league[rounds - 1 - i]]);
        } else {
          schedule[j].push([league[rounds - 1 - i], league[i]]);
        }
      }
    }

    // Check if there are elements to pop before popping
    if (league.length > 0) {
      league.splice(1, 0, league.pop()!);
    }
  }
  return schedule;
};

export default roundRobin;

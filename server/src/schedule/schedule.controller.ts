import { Competitor, Schedule } from "../shared/database";

const insert = async (req: any, res: any) => {
  const { fixture } = req.body;
  console.log(fixture);

  let competitor1 = await Competitor.findOne({
    where: {
      name: fixture.player1,
      tournamentid: fixture.tournamentid,
    },
  });

  let competitor2 = await Competitor.findOne({
    where: {
      name: fixture.player2,
      tournamentid: fixture.tournamentid,
    },
  });

  competitor1 = competitor1.dataValues;
  competitor2 = competitor2.dataValues;

  competitor1.playedmatches = competitor1.playedmatches + 1;
  competitor2.playedmatches = competitor2.playedmatches + 1;

  const score = fixture.score;
  const scorep1 = score.split("-")[0];
  const scorep2 = score.split("-")[1];

  if (scorep1 > scorep2) {
    competitor1.wins = competitor1.wins + 1;
  } else if (scorep1 < scorep2) {
    competitor2.wins = competitor2.wins + 1;
  } else {
    competitor1.draws = competitor1.draws + 1;
    competitor2.draws = competitor2.draws + 1;
  }
  console.log(fixture);
  await Schedule.update(
    { score: fixture.score, played: fixture.played },
    { where: { id: fixture.id } }
  );

  await Competitor.update(
    {
      playedmatches: competitor1.playedmatches,
      wins: competitor1.wins,
      draws: competitor1.draws,
    },
    { where: { id: competitor1.id } }
  );

  await Competitor.update(
    {
      playedmatches: competitor2.playedmatches,
      wins: competitor2.wins,
      draws: competitor2.draws,
    },
    { where: { id: competitor2.id } }
  );
};

export { insert };

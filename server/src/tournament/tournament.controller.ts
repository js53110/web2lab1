import { NOT_FOUND, OK } from "http-status";

import { Tournament, Competitor, Schedule } from "../shared/database";
import roundRobin from "../shared/scripts/roundRobin";

const insert = async (req: any, res: any) => {
  let tournamentData = req.body.tournament;
  let competitors = req.body.competitors;
  const tournament = await Tournament.create(tournamentData);

  const pairings = roundRobin(competitors);

  //key, ime, tournamentid, playedmatches, wins, draws

  await Competitor.bulkCreate(
    competitors.map((name: String) => {
      return {
        name,
        tournamentid: tournament.id,
        playedmatches: 0,
        wins: 0,
        draws: 0,
      };
    })
  );

  pairings.forEach(async (round) => {
    await Schedule.bulkCreate(
      round.map((match) => {
        return {
          player1: match[0],
          player2: match[1],
          score: null,
          tournamentid: tournament.id,
          played: false,
        };
      })
    );
  });

  return res.status(OK).json({ tournament });
};

const fetchAll = async (req: any, res: any) => {
  const tournament = await Tournament.findAll();
  return res.status(OK).json({ tournament });
};

const fetchByUser = async (req: any, res: any) => {
  const userId: number = parseInt(req.params.id, 10);
  console.log(typeof userId);

  const tournaments = await Tournament.findAll({
    where: { creatorid: userId },
  });
  console.log(tournaments);
  return res.status(200).json({ tournaments });
};

const fetchById = async (req: any, res: any) => {
  const tournament = await Tournament.findOne({ where: { id: req.params.id } });
  return res.status(OK).json({ tournament });
};

export { insert, fetchAll, fetchByUser, fetchById };

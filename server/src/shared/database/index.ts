import { Sequelize, DataTypes } from "sequelize";
import { forEach, invoke } from "lodash";

import UserModel from "../../user/user.model";
import TournamentModel from "../../tournament/tournament.model";
import CompetitorModel from "../../competitor/competitor.model";
import ScheduleModel from "../../schedule/schedule.model";

const sequelize = new Sequelize(
  "web2lab2_m4n1",
  "web2lab2",
  "DOZu47OQr8GMDaJDGNNULANL9ZRD4m6V",
  {
    dialect: "postgres",
    host: "dpg-cl51ess72pts739pbrbg-a.oregon-postgres.render.com",
    port: 5432,
    ssl: true,
  }
);

const models = {
  User: defineModel(UserModel),
  Tournament: defineModel(TournamentModel),
  Competitor: defineModel(CompetitorModel),
  Schedule: defineModel(ScheduleModel),
};

function defineModel(Model: any) {
  const fields = invoke(Model, "fields", sequelize) || {};
  const dbOptions = invoke(Model, "dbOptions", sequelize) || {};
  Object.assign(dbOptions, { sequelize });
  return Model.init(fields, dbOptions);
}

forEach(models, (model) => {
  invoke(model, "associate", models);
  addHooks(model, models);
  addScopes(model, models);
});

function addHooks(model: any, models: any) {
  const hooks = invoke(model, "hooks", models);
  forEach(hooks, (hook, type) => model.addHook(type, hook));
}

function addScopes(model: any, models: any) {
  const scopes = invoke(model, "scopes", models);
  forEach(scopes, (scope, name) =>
    model.addScope(name, scope, { override: true })
  );
}

const { User, Tournament, Competitor, Schedule } = models;
export { User, Tournament, Competitor, Schedule };
export default sequelize;

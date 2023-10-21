import { Sequelize, DataTypes } from "sequelize";
import { forEach, invoke } from "lodash";

import UserModel from "../../user/user.model";
import TournamentModel from "../../tournament/tournament.model";
import CompetitorModel from "../../competitor/competitor.model";
import ScheduleModel from "../../schedule/schedule.model";

const sequelize = new Sequelize(
  "web2lab1_0uiy",
  "web2lab1",
  "TVAupXWusYv9TA5ppSJdWmOejUrr5gve",
  {
    dialect: "postgres",
    host: "dpg-ckpvfcu2eoec73fj70dg-a",
    port: 5432,
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

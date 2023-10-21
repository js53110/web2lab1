import { Model, DataTypes } from "sequelize";
import { BOOLEAN, INTEGER, STRING } from "sequelize";

class Schedule extends Model {
  static fields() {
    return {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      player1: {
        type: STRING,
        allowNull: false,
      },
      player2: {
        type: STRING,
        allowNull: false,
      },
      score: {
        type: STRING,
        allowNull: false,
      },
      tournamentid: {
        type: INTEGER,
        allowNull: false,
      },
      played: {
        type: BOOLEAN,
        allowNull: false,
      },
    };
  }

  static associate({ Tournament }: { Tournament: any }) {
    this.belongsTo(Tournament, {
      foreignKey: { name: "tournamentid", field: "tournamentid" },
    });
  }

  static dbOptions() {
    return {
      modelName: "schedule",
      tableName: "schedule",
      timestamps: false,
    };
  }
}

export default Schedule;

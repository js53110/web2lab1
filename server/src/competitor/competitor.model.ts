import { Model, DataTypes } from "sequelize";
import { INTEGER, STRING } from "sequelize";

class Competitor extends Model {
  static fields() {
    return {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: STRING,
        allowNull: false,
      },
      tournamentid: {
        type: STRING,
        allowNull: false,
      },
      playedmatches: {
        type: INTEGER,
        allowNull: false,
      },
      wins: {
        type: INTEGER,
        allowNull: false,
      },
      draws: {
        type: INTEGER,
        allowNull: false,
      },
    };
  }

  static associate({ Tournament }: { Tournament: any }) {
    this.belongsTo(Tournament, {
      foreignKey: { name: "tournamentid", field: "tournamentid" },
    });
  }

  static scopes({ Tournament }: { Tournament: any }) {
    return {
      defaultScope: {},
      withTournament: {
        include: [Tournament],
      },
    };
  }

  static dbOptions() {
    return {
      modelName: "competitor",
      tableName: "competitors",
      timestamps: false,
    };
  }
}

export default Competitor;

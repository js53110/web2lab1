import { Model, DataTypes } from "sequelize";
import { INTEGER, STRING } from "sequelize";

class Tournament extends Model {
  static fields() {
    return {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tournamentname: {
        type: STRING,
        allowNull: false,
      },
      pointssystem: {
        type: STRING,
        allowNull: false,
      },
      numofcompetitors: {
        type: INTEGER,
        allowNull: false,
      },
      creatorid: {
        type: INTEGER,
        allowNull: false,
      },
    };
  }

  static associate({
    User,
    Schedule,
    Competitor,
  }: {
    User: any;
    Schedule: any;
    Competitor: any;
  }) {
    this.belongsTo(User, {
      foreignKey: { name: "creatorid", field: "creatorid" },
    });
    this.hasMany(Schedule, {
      foreignKey: { name: "tournamentid", field: "tournamentid" },
    });
    this.hasMany(Competitor, {
      foreignKey: { name: "tournamentid", field: "tournamentid" },
    });
  }

  static scopes({
    User,
    Schedule,
    Competitor,
  }: {
    User: any;
    Schedule: any;
    Competitor: any;
  }) {
    return {
      defaultScope: {
        include: [Schedule, Competitor],
      },
    };
  }

  static dbOptions() {
    return {
      modelName: "tournament",
      tableName: "tournaments",
      timestamps: false,
    };
  }
}

export default Tournament;

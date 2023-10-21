import { Model, DataTypes } from "sequelize";
import { INTEGER, STRING } from "sequelize";

class User extends Model {
  static fields() {
    return {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: STRING,
        allowNull: false,
      },
    };
  }

  static dbOptions() {
    return {
      modelName: "user",
      tableName: "users",
      timestamps: false,
    };
  }
}

export default User;

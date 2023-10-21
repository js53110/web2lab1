import { Sequelize } from "sequelize";

const sequelizeConnection = new Sequelize("web2lab1", "postgres", "bazepodataka", {
    dialect: "postgres",
    host: "localhost",
  });

  export default sequelizeConnection
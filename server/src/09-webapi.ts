import express from "express";
import https from "https"; // Import the 'https' module
import fs from "fs"; // Import the 'fs' module for file operations
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";
import router from "./router";
import sequelize from "./shared/database/index";
import bodyParser from "body-parser";

const app = express();
app.use(cors());

const authServer = "https://js53110.eu.auth0.com";

app.use(bodyParser.json());

app.use("/api", router);


(async () => {
  console.log("Connecting to the database...");
  try {
    await sequelize.authenticate().then(async () => {
      const queryInterface = sequelize.getQueryInterface();
      const tables = await queryInterface.showAllTables();

      console.log("List of tables in the database:");
      tables.forEach((table) => {
        console.log(table);
      });
    });
    console.log("Connected to the database.");
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
})();

const port = 4091;
const host = "";

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

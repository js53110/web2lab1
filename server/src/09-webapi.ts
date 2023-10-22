import express, { request } from "express";
import https from "https";
import fs from "fs";
import cors from "cors";
import axios from "axios";
import router from "./router";
import sequelize from "./shared/database/index";
import bodyParser from "body-parser";

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use("/api", router);

// Set up HTTPS options with your SSL certificate

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

const port = 3000;
const host = "127.0.0.1";

const server = app.listen(port, host, () => {
  console.log("Web service running over HTTP");
  const address = server.address() as any;
  console.log("FFFF: " + address); // Explicitly specify the type as 'any'
  console.log("address " + address.address);
  console.log("port " + address.port);
});

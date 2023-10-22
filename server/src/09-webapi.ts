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
const httpsOptions = {
  key: fs.readFileSync("./server.key"),
  cert: fs.readFileSync("./server.cert"),
};

// Create an HTTPS server
const httpsServer = https.createServer(httpsOptions, app);

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

app.listen(port, () => {
  console.log(`Web API running at port:${port}/`);
});

import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import https from "https";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

export default ({ command }) => {
  process.env = { ...process.env, ...loadEnv(command, process.cwd()) };
  return defineConfig({
    plugins: [svelte()],

    server: {
      port: process.env.PORT || 4092,
      https: command === "serve" && {
        key: fs.readFileSync("../server.key"), // Path to your private key file
        cert: fs.readFileSync("../server.cert"), // Path to your certificate file
      },
    },
  });
};

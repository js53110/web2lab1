import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";

dotenv.config();

export default ({ command }) => {
  process.env = { ...process.env, ...loadEnv(command, process.cwd()) };
  return defineConfig({
    plugins: [svelte()],

    server: {
      host: true,
      strictPort: true,
      port: process.env.PORT,
      /*https: {
        key: fs.readFileSync("./server.key"),
        cert: fs.readFileSync("./server.cert"),
      },*/
    },
  });
};

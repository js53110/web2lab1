import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import dotenv from "dotenv";

dotenv.config();

export default ({ command }) => {
  process.env = { ...process.env, ...loadEnv(command, process.cwd()) };
  return defineConfig({
    plugins: [svelte()],

    server: {
      port: process.env.PORT || 4092,
    },
  });
};

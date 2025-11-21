import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true,
  },
  external: [
    "express",
    "cors",
    "cookie-parser",
    "mongoose",
    "socket.io",
    "jsonwebtoken",
    "bcryptjs",
    "zod",
    "dotenv",
  ],
  plugins: [
    json(),
    nodeResolve({ extensions: [".js", ".ts"] }),
    commonjs(),
    typescript({
      tsconfig: "tsconfig.json",
      useTsconfigDeclarationDir: true,
    }),
  ],
};

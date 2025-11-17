import { beforeAll, afterAll } from "vitest";
import { connectTestDB, closeTestDB } from "./setup";

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

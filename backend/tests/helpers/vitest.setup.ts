import { beforeAll, afterAll, beforeEach } from "vitest";
import { connectTestDB, closeTestDB, clearTestDB } from "./setup";

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await closeTestDB();
});

beforeEach(async () => {
  await clearTestDB();
});

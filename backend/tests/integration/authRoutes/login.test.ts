import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import User from "../../../src/app/models/user.model";
import app from "../../../src/app/app";

describe("login route", () => {
  beforeAll(async () => {
    await User.create({
      fullName: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  it("should return user data", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("_id");
  });

  it("should fail if email is invalid", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      fullName: "John Doe",
      email: "invalid-email",
      password: "password123",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("validationErrors");
  });
});

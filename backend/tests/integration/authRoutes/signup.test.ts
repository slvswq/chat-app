import request from "supertest";
import app from "../../../src/app/app";
import User from "../../../src/app/models/user.model";

import { describe, it, expect } from "vitest";

describe("signup route", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      fullName: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    // Check response
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.email).toBe("john@example.com");

    // Check DB directly
    const user = await User.findOne({ email: "john@example.com" });
    expect(user).not.toBeNull();
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

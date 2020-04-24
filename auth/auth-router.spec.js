const request = require("supertest");
const app = require("../api/server.js");

describe("auth-router", () => {
  describe("POST /api/auth/register", () => {
    it("rejects invalid credential parameters", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({ username: "passwordless_joe" });
      expect(response.status).toBe(400);
    });

    it.todo("returns the new user id");
  });

  describe("POST /api/auth/login", () => {
    it.todo("rejects invalid credentials");
    it.todo("returns a token for valid users");
  });
});

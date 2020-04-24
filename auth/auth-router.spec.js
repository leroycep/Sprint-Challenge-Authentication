const request = require("supertest");
const app = require("../api/server.js");
const db = require("../database/dbConfig.js");

describe("auth-router", () => {
  describe("POST /api/auth/register", () => {
    beforeEach(() => {
      db("users").truncate();
    });

    it("rejects invalid credential parameters", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({ username: "passwordless_joe" });
      expect(response.status).toBe(400);
    });

    it("returns the new user", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({ username: "mithrandir", password: "melloc" });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.username).toBe("mithrandir");
    });
  });

  describe("POST /api/auth/login", () => {
    it.todo("rejects invalid credentials");
    it.todo("returns a token for valid users");
  });
});

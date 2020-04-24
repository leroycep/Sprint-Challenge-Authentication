const request = require("supertest");
const app = require("../api/server.js");
const db = require("../database/dbConfig.js");
const bcrypt = require("bcryptjs");
const secrets = require("../secrets.js");

describe("auth-router", () => {
  describe("POST /api/auth/register", () => {
    beforeEach(() => {
      return db("users").truncate();
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
    const test_credentials = {
      username: "mithrandir",
      password: "melloc",
    };

    beforeAll(() => {
      return db("users")
        .truncate()
        .then(() =>
          db("users").insert({
            username: test_credentials.username,
            password: bcrypt.hashSync(
              test_credentials.password,
              secrets.hashRounds
            ),
          })
        );
    });

    it("rejects unknown accounts with 404", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ username: "unaccounted_joe", password: "1234" });
      expect(response.status).toBe(404);
    });

    it("rejects invalid credentials with 401", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          username: test_credentials.username,
          password: "incorrect password",
        });
      expect(response.status).toBe(401);
    });

    it("returns a token for valid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send(test_credentials);
      expect(response.status).toBe(200);
      expect(response.body.token).toBeTruthy();
    });
  });
});

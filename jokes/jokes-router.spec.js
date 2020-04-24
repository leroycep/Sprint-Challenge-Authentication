const request = require("supertest");
const app = require("../api/server.js");
const jwt = require("jsonwebtoken");
const secrets = require("../secrets.js");

describe("jokes-router", () => {
  describe("GET /api/jokes", () => {
    let token = null;

    beforeAll(() => {
      const test_credentials = {
        id: 1337,
        username: "mithrandir",
      };

      const options = {
        expiresIn: "1d",
      };

      token = jwt.sign(test_credentials, secrets.jwtSecret, options);
    });

    it("rejects unauthorized users", async () => {
      const response = await request(app).get("/api/jokes");
      expect(response.status).toBe(401);
    });

    it("returns a list of jokes", async () => {
      const response = await request(app)
        .get("/api/jokes")
        .set("Authorization", token);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
});

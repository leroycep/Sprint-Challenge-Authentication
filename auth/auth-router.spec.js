const request = require("supertest");

describe("auth-router", () => {
  describe("POST /api/register", () => {
    it.todo("rejects invalid credential parameters");
    it.todo("returns the new user id");
  });

  describe("POST /api/login", () => {
    it.todo("rejects invalid credentials");
    it.todo("returns a token for valid users");
  });
});

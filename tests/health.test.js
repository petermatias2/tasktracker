const request = require("supertest");
const app = require("../app");

describe("Health endpoint", () => {
  it("should return ok:true", async () => {
    const res = await request(app).get("/healthz");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("ok", true);
  });
});

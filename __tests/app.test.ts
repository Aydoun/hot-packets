import request from "supertest";
import app from "../src/app";
jest.mock("../src/models/Packets");

describe("App Test", () => {
  test("GET /random-url should return 404", (done) => {
    request(app).get("/reset").expect(404, done);
    request(app).get("/not-existant").expect(404, done);
  });
});

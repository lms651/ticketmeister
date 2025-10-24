import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.venue.test" });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();

});

describe("Venue Routes", () => {
  let venueId;

  beforeEach(async () => {
    // Clear collection
    await mongoose.connection.collection("venues").deleteMany({});

    // POST a new venue
    const res = await request(app)
      .post("/venues")
      .send({
        venueName: "Main Hall",
        eventName: `Concert Night ${Date.now()}`,
        eventDescription: "Live music event",
        eventDate: "2025-11-01",
        eventTime: "19:00",
        ticketPrice: 50,
      });

    // Check POST succeeded
    expect(res.statusCode).toBe(201);
    expect(res.body._id).toBeDefined();

    // Save the ID
    venueId = res.body._id;

    // Logs go here inside beforeEach
    console.log("POST response:", res.statusCode, res.body);
    console.log("Venue ID:", venueId);
  });

  test("GET /venues should return list of venues", async () => {
    const res = await request(app).get("/venues");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  test("GET /venues/:id should return a single venue", async () => {
    const res = await request(app).get(`/venues/${venueId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("_id", venueId);
  });

  test("PUT /venues/:id should update venue", async () => {
    const res = await request(app)
      .put(`/venues/${venueId}`)
      .send({ ticketPrice: 60 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("ticketPrice", 60);
  });

  test("DELETE /venues/:id should delete venue", async () => {
    const res = await request(app).delete(`/venues/${venueId}`);
    expect(res.statusCode).toBe(200);

    const check = await request(app).get(`/venues/${venueId}`);
    expect(check.statusCode).toBe(404);
  });
});

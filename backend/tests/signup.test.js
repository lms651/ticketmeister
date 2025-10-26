import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.signup.test" });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
})

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
})

describe("SignUp Routes", () => {
  let userId;
  let venueId;

  beforeEach(async () => {
    await mongoose.connection.collection("users").deleteMany({});
    await mongoose.connection.collection("venues").deleteMany({});
    await mongoose.connection.collection("signups").deleteMany({});

    const userRes = await request(app)
      .post("/users/register")
      .send({
        name: "Jane",
        phone: "666-666-66666",
        phoneType: "home",
        address: "555 Main St",
        password: "mypass"
      })

    expect(userRes.statusCode).toBe(201);
    expect(userRes.body._id).toBeDefined();
    userId = userRes.body._id;
    console.log("User ID:", userId);

    const venueRes = await request(app)
      .post("/venues")
      .send({
        venueName: "Gilette Statdium",
        eventName: `Football Night ${Date.now()}`,
        eventDescription: "Live football event",
        eventDate: "2025-01-01",
        eventTime: "14:00",
        ticketPrice: 40
      })

    expect(venueRes.statusCode).toBe(201);
    expect(venueRes.body._id).toBeDefined();
    venueId = venueRes.body._id;
    console.log("Venue ID:", venueId);
  })

  test("POST /signups should create a new signup", async () => {
    const res = await request(app)
      .post("/signups")
      .send({
        userId,
        venueId,
        ticketCount: 3
      })

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("ticketCount", 3);
    console.log("Signup created:", res.body);
  })

  test("GET /signups/venue/:venueId should return all signups for a venue", async () => {
    await request(app)
      .post("/signups")
      .send({ userId, venueId, ticketCount: 4 });

    const res = await request(app).get(`/signups/venue/${venueId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty("ticketCount", 4);
  })

  test("GET /signups/user/:userId should return all signups for a user", async () => {
    await request(app)
      .post("/signups")
      .send({ userId, venueId, ticketCount: 4 });

    const res = await request(app).get(`/signups/user/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty("ticketCount", 4);
  })
})
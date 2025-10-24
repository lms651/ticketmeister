import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.user.test" });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  // drop DB once at the end and close connection
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("User Routes", () => {
  let loriId;

  beforeEach(async () => {
    // Clear only the users collection
    await mongoose.connection.collection("users").deleteMany({});

    // Insert a known user
    const res = await request(app)
      .post("/users/register")
      .send({
        name: "Lori",
        phone: "123-456-7890",
        phoneType: "mobile",
        address: "123 Main St",
        password: "password123"
      });
    
    loriId = res.body._id; // save for PUT tests
  });

  test("POST /users/register should create a new user", async () => {
    const res = await request(app)
      .post("/users/register")
      .send({
        name: "Alice",
        phone: "987-654-3210",
        phoneType: "home",
        address: "456 Elm St",
        password: "password456"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("name", "Alice");
  });

  test("GET /users should return list of users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1); // only Lori
    expect(res.body[0]).toHaveProperty("name", "Lori");
  });

  test("PUT /users/:id should update an existing user", async () => {
    const updateRes = await request(app)
      .put(`/users/${loriId}`)
      .send({ phone: "987-654-3210" });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body).toHaveProperty("phone", "987-654-3210");
  });
});

// import request from "supertest";
// import app from "../src/app.js";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config({ path: ".env.user.test" });

// let loriId;

// beforeAll(async () => {
//   // Connect to the test database
//   await mongoose.connect(process.env.MONGO_URI);
// });

// beforeEach(async () => {
//   // Clear users collection before each test
//   await mongoose.connection.collection("users").deleteMany({});

//   // Insert a known baseline user
//   const res = await request(app)
//     .post("/users/register")
//     .send({
//       name: "Lori",
//       phone: "123-456-7890",
//       phoneType: "mobile",
//       address: "123 Main St",
//       password: "password123"
//     });

//   loriId = res.body._id; // save for PUT tests
// });

// afterAll(async () => {
//   // Drop the database after all tests and close connection
//   await mongoose.connection.db.dropDatabase();
//   await mongoose.connection.close();
// });

// describe("User Routes", () => {
//   test("POST /users/register should create a new user", async () => {
//     const res = await request(app)
//       .post("/users/register")
//       .send({
//         name: "Alice",
//         phone: "987-654-3210",
//         phoneType: "home",
//         address: "456 Elm St",
//         password: "password456"
//       });

//     expect(res.statusCode).toBe(201);
//     expect(res.body).toHaveProperty("name", "Alice");
//   });

//   test("GET /users should return list of users", async () => {
//     const res = await request(app).get("/users");
//     expect(res.statusCode).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);
//     expect(res.body.length).toBe(1); // only Lori is present from beforeEach
//     expect(res.body[0]).toHaveProperty("name", "Lori");
//   });

//   test("PUT /users/:id should update an existing user", async () => {
//     const updateRes = await request(app)
//       .put(`/users/${loriId}`)
//       .send({ phone: "987-654-3210" });

//     expect(updateRes.statusCode).toBe(200);
//     expect(updateRes.body).toHaveProperty("phone", "987-654-3210");
//   });
// });

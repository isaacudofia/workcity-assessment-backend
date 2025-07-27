const request = require("supertest");
const app = require("../src/server");
const mongoose = require("mongoose");
const User = require("../src/models/User");
const Client = require("../src/models/Client");

let adminToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await User.deleteMany({});
  await Client.deleteMany({});
  // Create admin user
  await request(app).post("/api/auth/signup").send({
    name: "Admin",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
  });
  // Login admin
  const res = await request(app).post("/api/auth/login").send({
    email: "admin@example.com",
    password: "password123",
  });
  adminToken = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Create Client", () => {
  it("should create a new client", async () => {
    const res = await request(app)
      .post("/api/clients")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Test Client",
        email: "client@example.com",
        phone: "1234567890",
        address: "123 Main St",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Test Client");
  });
});

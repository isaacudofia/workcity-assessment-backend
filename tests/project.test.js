const request = require("supertest");
const app = require("../src/server");
const mongoose = require("mongoose");
const User = require("../src/models/User");
const Client = require("../src/models/Client");
const Project = require("../src/models/Project");

let adminToken, clientId, projectId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await User.deleteMany({});
  await Client.deleteMany({});
  await Project.deleteMany({});
  // Create admin user
  await request(app).post("/api/auth/signup").send({
    name: "Admin",
    email: "admin2@example.com",
    password: "password123",
    role: "admin",
  });
  // Login admin
  const res = await request(app).post("/api/auth/login").send({
    email: "admin2@example.com",
    password: "password123",
  });
  adminToken = res.body.token;
  // Create client
  const clientRes = await request(app)
    .post("/api/clients")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Client2",
      email: "client2@example.com",
      phone: "1234567890",
      address: "456 Main St",
    });
  clientId = clientRes.body._id;
  // Create project
  const projectRes = await request(app)
    .post("/api/projects")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      title: "Project1",
      client: clientId,
    });
  projectId = projectRes.body._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Update Project", () => {
  it("should update a project", async () => {
    const res = await request(app)
      .put(`/api/projects/${projectId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Updated Project",
        status: "active",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Updated Project");
    expect(res.body.status).toBe("active");
  });
});

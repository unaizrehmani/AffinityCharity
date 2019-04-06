require("dotenv/config");
const app = require("../server/util/app");
const request = require("supertest");

describe("Test Users API", () => {
    let token = "";

    before(async () => {
        await require("../server/util/db")(process.env.MONGO_DB_USER, process.env.MONGO_DB_PASSWORD, process.env.MONGO_DB_NAME);
        const response = await request(app).post("/api/auth/token").send({
            email: "unaizrehmani@gmail.com",
            password: "password"
        })
        token = response.text;
    })

    it("GET /api/users", async () => {
        await request(app).get("/api/users").set("Authorization", "Bearer " + token).expect(200)
    })

    after(() => {

    });
})
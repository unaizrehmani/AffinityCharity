require("dotenv/config");
const app = require("../server/util/app");
const request = require("supertest");
const {
    expect
} = require("chai")

describe("Test Users API", () => {
    let token = "";

    before(async () => {
        await require("../server/util/db")(process.env.MONGO_DB_USER, process.env.MONGO_DB_PASSWORD, process.env.MONGO_DB_NAME);
        const response = await request(app).post("/api/auth/token").send({
            email: "unaizrehmani@gmail.com",
            password: "password"
        })
        token = response.text;
        expect(token).to.be.a('string', 'token is not a string');

    })

    it("POST /api/users without image", async () => {
        const form = {
            firstName: "firstName",
            lastName: "lastName",
            email: "test@email.com",
            password: "password"
        }

        const {
            body
        } = await request(app)
            .post("/api/users")
            .field("firstName", form.firstName)
            .field("lastName", form.lastName)
            .field("email", form.email)
            .field("password", form.password)
            .expect(200);

        expect(body).to.not.have.own.property("password");
        expect(body).to.not.have.own.property("__v");

        expect(body).to.have.own.property('_id', body._id, "created user does not have property _id");
        expect(body).to.have.own.property('firstName', body.firstName, "created user does not have property _id");
        expect(body).to.have.own.property('lastName', body.lastName, "created user does not have property _id");
        expect(body).to.have.own.property('email', body.email, 'new user does not have an email property');
        expect(body).to.have.own.property('createdDate', body.createdDate, 'new user does not have a createdDate property');
        expect(body).to.have.own.property('imageID', body.imageID, 'new user does not have an imageID property');
        expect(body).to.have.own.property('mediaURL', body.mediaURL, 'new user does not have a mediaURL property');

        delete form.password;
        expect(body).to.include(form);
    })

    //TODO: implement GET /api/users test
    it("GET /api/users", async () => {
        await request(app).get("/api/users").set("Authorization", "Bearer " + token).expect(200)
    })

    //TODO: implement GET /api/users/:userID test
    it("GET /api/users/:userID", async () => {

    })

    //TODO: implement GET /api/users/:userID test
    it("GET /api/users/:userID", async () => {

    })

    //TODO: implement PATCH /api/users test
    it("PATCH /api/users/:userID", async () => {

    })

    //TODO: implement DELETE /api/users/:userID test
    it("DELETE /api/users/:userID", async () => {

    })

    after(() => {

    });
})
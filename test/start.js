require("dotenv/config")
const app = require("../server/util/app")

describe("GET /api/users", () => {
    before(async () => {
        console.log('in before hook')
        await require("../server/util/db")(process.env.MONGO_DB_USER, process.env.MONGO_DB_PASSWORD, process.env.MONGO_DB_NAME);
    })

    it("should get all users", () => {
        console.log("should get all users")
    })

    after(() => {
        console.log("in after hook");
    });
})
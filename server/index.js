const connect = async () => {
  await require("./util/db")(process.env.MONGO_DB_USER, process.env.MONGO_DB_PASSWORD, process.env.MONGO_DB_NAME);
  require("./util/app")
  console.log("Database and app set")
}

module.exports = connect();
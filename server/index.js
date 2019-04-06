const connect = async () => {
  await require("./util/db")(process.env.MONGO_DB_USER, process.env.MONGO_DB_PASSWORD, process.env.MONGO_DB_NAME);
  require("./util/app")
}

module.exports = connect();
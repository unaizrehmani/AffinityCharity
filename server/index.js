const connect = async () => {
  await require("./util/db")();
  require("./util/server");
}
connect();
module.exports = connect;
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const MongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://unaizrehmani:Mcdonalds1!@cluster0-jgsmf.mongodb.net/test?retryWrites=true"
  )
    .then(client => {
      console.log("Connected to MongoDB");
      _db = client.db();
      callback(client);
    })
    .catch(err => {
      console.log("Could not connect to Mongodb: ", err);
      throw err;
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No Database found";
};

exports.MongoConnect = MongoConnect;
exports.getDB = getDB;

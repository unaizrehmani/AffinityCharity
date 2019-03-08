const getDB = require("../util/database").getDB;

class User {
  constructor(firstName, lastName, email, password, imageURL) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.imageURL = imageURL;
  }

  save() {
    const db = getDB();
    db.collection("users")
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;

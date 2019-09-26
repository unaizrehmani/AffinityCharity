const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0-jgsmf.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
      },
      () => {}
    );
    return connection;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = connectDB();

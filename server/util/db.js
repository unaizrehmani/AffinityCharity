const mongoose = require("mongoose")

const connectDB = async (MONGO_DB_USER, MONGO_DB_PASSWORD, MONGO_DB_NAME) => {
    try {
        const connection = await mongoose
            .connect(
                `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0-jgsmf.mongodb.net/${MONGO_DB_NAME}?retryWrites=true`, {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useFindAndModify: false
                },
                () => {}
            )
        console.log('MongoDB connected');
        return connection;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = connectDB;
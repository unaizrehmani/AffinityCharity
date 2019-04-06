const mongoose = require("mongoose")

module.exports = async () => {
    try {
        const connection = await mongoose
            .connect(
                `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0-jgsmf.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true`, {
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
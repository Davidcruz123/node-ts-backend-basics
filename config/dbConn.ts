import mongoose, { ConnectOptions } from "mongoose";

const connectDb = async () => {

    const testURI = "mongodb://localhost:27017/mongo-express-learning"

    try {
        // await mongoose.connect(process.env.DATABASE_URI as string,{
        await mongoose.connect(testURI , {

            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)
    } catch (e) {
        console.log(e);
    }
}

export default connectDb;
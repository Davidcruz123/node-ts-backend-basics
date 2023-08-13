import mongoose, { ConnectOptions }  from "mongoose";

const connectDb =async () => {

    try{
        await mongoose.connect(process.env.DATABASE_URI as string,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          } as ConnectOptions )
    } catch(e) {
        console.log(e);
    }
}

export default connectDb;
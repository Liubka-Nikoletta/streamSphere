import mongoose from "mongoose";

const connectToStreamSchemeDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connected");
    } catch(err){
        console.log(err);
        process.exit(1);
    }
}

export default connectToStreamSchemeDB;
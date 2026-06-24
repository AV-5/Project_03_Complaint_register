import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const connectDB=async()=>{
    console.log(process.env.MONGO_URI);
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database successfully");
    }
    catch(err){
        console.log("Error in connecting to database",err);
    }
}
export default connectDB;

import mongoose from "mongoose";


const connectDB = async () => {

    mongoose.connection.on('connected', () =>{
        console.log("DB is Connected to Vivid Valley");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/vividvalley`)
}

export default connectDB;
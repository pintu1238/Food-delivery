import mongoose from "mongoose"

const connectDb=async()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Db Connected")

  }
  catch(error){
    console.error(" Db error", error.message);

  }
}
export default connectDb;
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config()

const connectDb=async()=>{
    try {
        console.log("Connecting to MongoDB...")
        console.log(process.env.Mongo_URI)

        const connect=await mongoose.connect(process.env.Mongo_URI)

        console.log("mongodb connected:",connect.connection.host)
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}
 
module.exports=connectDb
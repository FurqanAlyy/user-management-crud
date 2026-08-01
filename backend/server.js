const express=require('express');
const connectDb=require('./config/db');
const cors = require("cors")
const authRoutes=require('./routes/authRoutes');
const userRoutes = require("./routes/userRoutes");
const dotenv=require('dotenv');
dotenv.config()

connectDb();

const app=express();
const port=process.env.port;
console.log(port)
app.use(express.json());
app.use(cors())

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req,res)=>{
    res.send("/ api is running in server.js")
})

app.listen(port,()=>{
    console.log(`Server is running in ${port}`)
})
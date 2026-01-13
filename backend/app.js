import dotenv from "dotenv";
dotenv.config();
import express from "express";
import {createServer} from "node:http";
import { connectToSocket } from "./controllers/socketManager.js";
import  cors  from "cors";
import mongoose, { mongo } from "mongoose";
import userRoutes from "./routes/user.js"
import gigRoutes from "./routes/gigs.js"
import bidRoutes from "./routes/bids.js"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import Bid from "./models/bid.js";
import Gig from "./models/gig.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
app.use(cookieParser());
app.use(express.json());


app.use(cors());

app.use("/user" , userRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/bids", bidRoutes);



const start = async ()=>{

    server.listen(8000 , ()=>{
        console.log("server is listening on port: "+8000)
    });
    let url = process.env.MONGO_URL;
    mongoose.connect(url)
    .then(()=>console.log("database connected"))
    .catch((e)=>console.log("database not connected"));

    
}

start();
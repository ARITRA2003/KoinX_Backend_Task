import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToMongo } from "./db/db.js";
import './jobs/FetchCryptoDataScheduleJob.js';

dotenv.config();

connectToMongo();

const app = express();

//Required configurations  
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes



app.get("/",(req,res) => {
    res.send("Get Data of crypto currencies");
});

export default app;

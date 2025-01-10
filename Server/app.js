import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToMongo } from "./db/db.js";
import './jobs/FetchCryptoDataScheduleJob.js';// Task - 1
import CryptoCurrencyDataRouter from "./routes/CryptoCurrencyData.route.js";//Task 2 & 3

dotenv.config();

connectToMongo();

const app = express();

//Required configurations  
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes
// Task 2 and 3
app.use("/api",CryptoCurrencyDataRouter);


app.get("/",(req,res) => {
    res.send("Get Data of crypto currencies");
});

export default app;

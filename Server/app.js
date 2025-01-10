import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToMongo } from "./db/db.js";

dotenv.config();

connectToMongo();

const app = express();

//Required configurations  
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res) => {
    res.send("Hello, world");
});

export default app;

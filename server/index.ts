import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";



const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const app = express();
dotenv.config();
import {Response, Request} from 'express';


app.get('/', (req:Request, res:Response) => {
     res.send('Welcome to server');
  });


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);


app.listen(5000, () => {
    console.log("Backend server is running");
});

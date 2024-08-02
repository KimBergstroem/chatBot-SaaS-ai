import express from "express";
import { config } from "dotenv";

config();

//routes
const app = express();

//middlewares
app.use(express.json());

export default app;

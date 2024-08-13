import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

// Set the origin based on the environment
const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? process.env.VITE_API_ORIGIN_PROD
    : process.env.VITE_API_ORIGIN_LOCAL;

//middlewares
app.use(
  cors({
    origin: "https://chat-bot-saa-s-ai-frontend.vercel.app",
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1", appRouter);

export default app;

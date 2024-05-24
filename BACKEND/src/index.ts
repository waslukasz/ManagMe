import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./router";

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router());

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});

mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING)
  .then(() => console.log("Database connected."))
  .catch((error) => console.log("Database not connected.", error));

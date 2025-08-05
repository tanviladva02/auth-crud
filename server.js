import express from "express";
import authRouter from "./route/authRouter.js";
import productRouter from "./route/productRouter.js";
import { DBConnect } from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const port = 5000;
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  res.send("backend is running");
});

app.listen(port, async () => {
  try {
    await DBConnect();
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log(`something went wrong ${error}`);
  }
});

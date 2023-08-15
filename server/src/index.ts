import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import errorHandler from "./middleware/errorHandler";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import productRouter from "./routes/product.routes";
import cartRouter from "./routes/cart.routes";
import purchaseRouter from "./routes/purchase.routes";

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/purchase", purchaseRouter);

app.use(errorHandler);

cloudinary.config({
    cloud_name: "dar5mfo5u",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => console.log("MongoDB Connected"));

app.listen(port, () => {
    console.log(`Server is listening to http://localhost:${port}`);
});

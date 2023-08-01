import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import errorHandler from "./middleware/errorHandler";

import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);

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

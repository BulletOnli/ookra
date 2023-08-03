import express from "express";
import {
    getUserDetails,
    loginUser,
    registerUser,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", getUserDetails);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;

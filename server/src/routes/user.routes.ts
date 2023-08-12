import express from "express";
import {
    getAccountDetails,
    getUserDetails,
    loginUser,
    registerUser,
} from "../controllers/user.controller";
import protectRoute from "../middleware/protectRoute";

const userRouter = express.Router();

userRouter.get("/account/details", protectRoute, getAccountDetails);
userRouter.get("/details", getUserDetails);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;

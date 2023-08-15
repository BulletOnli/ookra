import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/userModel";

// Details of the account logged in
export const getAccountDetails = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await User.findById(req.user._id).select("-password");

        res.status(200).json(user);
    }
);

// Details of the specific user
export const getUserDetails = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.query;
        const user = await User.findById(userId).select("-password");

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    }
);

import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";

// Details of the account logged in
export const getAccountDetails = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await User.findById(req.user._id).select("-password");

        res.status(200).json(user);
    }
);

export const updateAccountDetails = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await User.findById(req.user._id).select("-password");
        const { firstName, lastName, username } = req.body as {
            firstName: string;
            lastName: string;
            username: string;
        };

        if (user) {
            if (firstName) {
                user.firstName = firstName;
            }
            if (lastName) {
                user.lastName = lastName;
            }
            if (username) {
                const isUsernameExist = await User.findOne({ username });
                if (isUsernameExist) {
                    res.status(400);
                    throw new Error("Username already exist");
                }
                user.username = username;
            }
            await user.save();

            res.status(200).json("Account Details updated successfully");
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    }
);

export const changeAccountPassword = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await User.findById(req.user._id);
        const { oldPassword, newPassword } = req.body as {
            oldPassword: string;
            newPassword: string;
        };

        if (user) {
            if (!(await bcrypt.compare(oldPassword, user?.password))) {
                res.status(400);
                throw new Error("Password don't match");
            } else {
                if (newPassword.length < 8) {
                    res.status(400);
                    throw new Error(
                        "Password must be greater than 8 characters"
                    );
                }

                const hashPassword = await bcrypt.hash(newPassword, 12);

                user.password = hashPassword;
                await user.save();

                res.status(200).json(user);
            }
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    }
);

// Details of normal user
// For user profile
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

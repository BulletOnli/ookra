import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import bcrypt from "bcrypt";

const generateToken = (_id: string) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET!, {
        expiresIn: "3d",
    });
};

export const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { firstName, lastName, password, username, location } = req.body;
        const user = await User.findOne({ username });

        if (user) {
            res.status(400);
            throw new Error("Username already exist!");
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            firstName,
            lastName,
            password: hashedPassword,
            username,
            location,
        });

        if (newUser) {
            res.status(201).json({
                userId: newUser._id,
                token: generateToken(newUser._id.toString()),
            });
        } else {
            res.status(400);
            throw new Error("Registration failed");
        }
    }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        res.status(404);
        throw new Error("Username doesn't exists");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            userId: user._id,
            token: generateToken(user._id.toString()),
        });
    } else {
        res.status(400);
        throw new Error("Wrong password");
    }
});

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

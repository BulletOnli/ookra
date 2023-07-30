import * as globalTypes from "../types/global";
import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

const protectRoute = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        let token: string;
        const authHeader = req.headers["authorization"];

        if (authHeader) {
            try {
                token = authHeader.split(" ")[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
                    _id: string;
                };
                req.user = await User.findById(decoded._id).select("-password");
                next();
            } catch (error) {
                res.status(401);
                throw new Error("Token expired, Not Authorized");
            }
        } else {
            res.status(401);
            throw new Error("No Token, Not Authorized");
        }
    }
);

export default protectRoute;

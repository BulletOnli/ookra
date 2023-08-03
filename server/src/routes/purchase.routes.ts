import express, { Request, Response } from "express";
import protectRoute from "../middleware/protectRoute";
import asyncHandler from "express-async-handler";
import Purchase from "../models/purchaseModel";

const purchaseRouter = express.Router();

purchaseRouter.get(
    "/all",
    protectRoute,
    asyncHandler(async (req: Request, res: Response) => {
        const { userId } = req.query;
        const purchaseHistory = await Purchase.find({ purchaseOwner: userId });

        res.status(200).json(purchaseHistory);
    })
);

export default purchaseRouter;

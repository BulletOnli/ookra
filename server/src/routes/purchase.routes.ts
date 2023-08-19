import express, { Request, Response } from "express";
import protectRoute from "../middleware/auth/protectRoute";
import asyncHandler from "express-async-handler";
import Purchase from "../models/purchaseModel";
import roleChecker from "../middleware/auth/roleChecker";

const router = express.Router();

router.get(
    "/all",
    protectRoute,
    roleChecker(["Buyer"]),
    asyncHandler(async (req: Request, res: Response) => {
        const { userId } = req.query;
        const purchaseHistory = await Purchase.find({ purchaseOwner: userId });

        res.status(200).json(purchaseHistory);
    })
);

export default router;

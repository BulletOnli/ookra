import express from "express";
import {
    getAccountDetails,
    getUserDetails,
} from "../controllers/user.controller";
import protectRoute from "../middleware/auth/protectRoute";
import roleChecker from "../middleware/auth/roleChecker";

const router = express.Router();

router.get(
    "/account/details",
    protectRoute,
    roleChecker(["Seller", "Buyer"]),
    getAccountDetails
);
router.get("/details", protectRoute, getUserDetails);

export default router;

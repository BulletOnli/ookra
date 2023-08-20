import express from "express";
import {
    getAccountDetails,
    getUserDetails,
    updateAccountDetails,
    changeAccountPassword,
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
router.post(
    "/account/details/update",
    protectRoute,
    roleChecker(["Seller", "Buyer"]),
    updateAccountDetails
);
router.post(
    "/account/password/update",
    protectRoute,
    roleChecker(["Seller", "Buyer"]),
    changeAccountPassword
);

router.get("/details", protectRoute, getUserDetails);

export default router;

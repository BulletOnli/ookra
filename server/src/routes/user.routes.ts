import express from "express";
import {
    getAccountDetails,
    getUserDetails,
} from "../controllers/user.controller";
import protectRoute from "../middleware/protectRoute";

const router = express.Router();

router.get("/account/details", protectRoute, getAccountDetails);
router.get("/details", getUserDetails);

export default router;

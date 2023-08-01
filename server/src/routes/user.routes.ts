import express from "express";
import {
    getUserDetails,
    loginUser,
    registerUser,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUserDetails);

export default router;

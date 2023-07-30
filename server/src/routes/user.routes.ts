import express from "express";
import {
    addToCart,
    getCartItems,
    getUserDetails,
    loginUser,
    registerUser,
    removeToCart,
} from "../controllers/user.controller";
import protectRoute from "../middleware/protectRoute";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUserDetails);

router.get("/cart", protectRoute, getCartItems);
router.put("/cart/add", protectRoute, addToCart);
router.put("/cart/remove", protectRoute, removeToCart);

export default router;

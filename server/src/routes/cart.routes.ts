import express from "express";
const router = express.Router();
import {
    addToCart,
    decItemQuantity,
    getCartItems,
    incItemQuantity,
    removeToCart,
} from "../controllers/cart.controller";
import protectRoute from "../middleware/protectRoute";

router.get("/", protectRoute, getCartItems);
router.post("/add", protectRoute, addToCart);
router.delete("/remove", protectRoute, removeToCart);

router.put("/item/increase", protectRoute, incItemQuantity);
router.put("/item/decrease", protectRoute, decItemQuantity);

export default router;

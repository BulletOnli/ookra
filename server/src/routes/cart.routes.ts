import express from "express";
import {
    addToCart,
    cartCheckout,
    clearCart,
    decItemQuantity,
    getCartItems,
    incItemQuantity,
    removeToCart,
} from "../controllers/cart.controller";
import protectRoute from "../middleware/protectRoute";

const router = express.Router();

router.get("/all", protectRoute, getCartItems);

router.post("/add", protectRoute, addToCart);
router.delete("/remove", protectRoute, removeToCart);
router.delete("/remove/all", protectRoute, clearCart);

router.put("/item/increase", protectRoute, incItemQuantity);
router.put("/item/decrease", protectRoute, decItemQuantity);

router.post("/checkout", protectRoute, cartCheckout);

export default router;

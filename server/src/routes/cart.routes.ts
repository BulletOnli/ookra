import express from "express";
const cartRouter = express.Router();
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

cartRouter.get("/all", protectRoute, getCartItems);
cartRouter.delete("/all/remove", protectRoute, clearCart);

cartRouter.post("/add", protectRoute, addToCart);
cartRouter.delete("/remove", protectRoute, removeToCart);

cartRouter.put("/item/increase", protectRoute, incItemQuantity);
cartRouter.put("/item/decrease", protectRoute, decItemQuantity);

cartRouter.post("/checkout", protectRoute, cartCheckout);

export default cartRouter;

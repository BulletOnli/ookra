import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Cart, { CartType } from "../models/cartModel";
import Product, { productType } from "../models/productModel";

export const getCartItems = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.query;

        const cartItems = await Cart.find({ itemOwner: userId });

        res.status(200).json(cartItems);
    }
);

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.query;
    const product = await Product.findById(productId).populate({
        path: "seller",
        select: ["-password"],
    });
    const { productName, stocks, productImg, seller, price } =
        product as productType;

    const isInCart = await Cart.findOne({
        productId: product?._id,
    }).populate("seller");

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    if (isInCart) {
        isInCart.inCart += 1;
        await isInCart.save();

        res.status(200).json("+1 Item Quantity");
    } else {
        await Cart.create({
            productImg,
            productName,
            stocks,
            productId: product._id,
            seller: seller._id,
            price,
            inCart: 1,
            itemOwner: req.user._id,
        });
        res.status(201).json("Added to cart");
    }
});

export const removeToCart = asyncHandler(
    async (req: Request, res: Response) => {
        const { productId } = req.query;
        const isInCart = await Cart.findOne({ productId });

        if (!isInCart) {
            res.status(404);
            throw new Error("Product not found");
        }

        await Cart.deleteOne({ productId });
        res.status(200).json("Item removed to cart");
    }
);

export const incItemQuantity = asyncHandler(
    async (req: Request, res: Response) => {
        const { productId } = req.query;
        const itemInCart = await Cart.findOne({ productId });
        const product = await Product.findById(productId);

        if (!itemInCart || !product) {
            res.status(404);
            throw new Error("Product not found");
        }

        if (itemInCart.inCart < product.stocks) {
            itemInCart.inCart += 1;
            await itemInCart.save();

            res.status(200).json("+1 Item Quantity");
        } else {
            res.status(400);
            throw new Error("Out of stocks");
        }
    }
);

export const decItemQuantity = asyncHandler(
    async (req: Request, res: Response) => {
        const { productId } = req.query;
        const itemInCart = await Cart.findOne({ productId });

        if (!itemInCart) {
            res.status(404);
            throw new Error("Product not found");
        }

        if (itemInCart.inCart > 1) {
            itemInCart.inCart -= 1;
            await itemInCart.save();

            res.status(200).json("-1 Item Quantity");
        } else {
            res.status(400);
            throw new Error("Decrement not allowed");
        }
    }
);

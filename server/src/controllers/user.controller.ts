import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import Product from "../models/productModel";

const generateToken = (_id: string) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET!, {
        expiresIn: "3d",
    });
};

export const registerUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { firstName, lastName, password, username, location } = req.body;
        const user = await User.findOne({ username });

        if (user) {
            res.status(400);
            throw new Error("Username already exist!");
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            firstName,
            lastName,
            password: hashedPassword,
            username,
            location,
        });

        if (newUser) {
            res.status(201).json({
                userId: newUser._id,
                token: generateToken(newUser._id.toString()),
            });
        } else {
            res.status(400);
            throw new Error("Registration failed");
        }
    }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        res.status(404);
        throw new Error("Username doesn't exists");
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            userId: user._id,
            token: generateToken(user._id.toString()),
        });
    } else {
        res.status(400);
        throw new Error("Wrong password");
    }
});

export const getUserDetails = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.query;

        const user = await User.findById(userId).select("-password");

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    }
);

export const getCartItems = asyncHandler(
    async (req: Request, res: Response) => {
        const { userId } = req.query;

        const user = await User.findById(userId).select("-password");

        if (user) {
            res.status(200).json(user.cart);
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    }
);

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
    const { productId } = req.query;
    const product = await Product.findById(productId).populate({
        path: "seller",
        select: ["-password", "-cart"],
    });

    const user = await User.findById(req.user._id);

    if (user && product) {
        const { productImg, productName, _id, price, seller } = product;

        const isInCart = user.cart.find(
            (item) => item._id.toString() === _id.toString()
        );

        if (isInCart) {
            // remove the previous item in cart
            const updatedCart = user.cart.filter(
                (item) => item._id.toString() !== _id.toString()
            );

            user.cart = [
                { ...isInCart, inCart: isInCart.inCart + 1 },
                ...updatedCart,
            ];
            await user.save();

            res.status(200).json("Already in cart, +1 Quantity");
        } else {
            const addedProduct = {
                productImg,
                productName,
                _id,
                price,
                seller,
                inCart: 1,
            };

            user.cart = [...user.cart, addedProduct];
            await user.save();

            res.status(200).json("Added to cart");
        }
    } else {
        res.status(400);
        throw new Error("Product not found");
    }
});

export const removeToCart = asyncHandler(
    async (req: Request, res: Response) => {
        const { productId } = req.query;
        const product = await Product.findById(productId);
        const user = await User.findById(req.user._id).populate("cart");

        if (user && product) {
            const updatedCart = user.cart.filter(
                (item) => item._id.toString() !== productId
            );

            user.cart = updatedCart;
            await user.save();
            res.status(200).json("Removed to cart");
        } else {
            res.status(400);
            throw new Error("Product not found");
        }
    }
);

import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel";
import { uploadImg, deleteImg } from "../utils/cloudinary";

export const getSingleProduct = asyncHandler(
    async (req: Request, res: Response) => {
        const { productId } = req.query;
        const product = await Product.findById(productId).populate({
            path: "seller",
            select: ["-password", "-cart"],
        });

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404);
            throw new Error("Product not found");
        }
    }
);

export const getAllProducts = asyncHandler(
    async (req: Request, res: Response) => {
        const { sellerId } = req.query;

        let products = await Product.find().populate({
            path: "seller",
            select: ["-password", "-cart"],
        });

        if (sellerId) {
            products = products.filter(
                (product) => product.seller._id.toString() === sellerId
            );
        }

        res.status(200).json(products);
    }
);

export const addProduct = asyncHandler(async (req: Request, res: Response) => {
    const { productName, description, category, price, stocks, sold } =
        req.body;

    const img = await uploadImg(
        req.file as { path: string; originalname: string }
    );

    const productImg = {
        url: img.url,
        id: img.asset_id,
    };

    const newProduct = await Product.create({
        productName,
        description,
        category,
        price,
        stocks,
        sold,
        productImg,
        seller: req.user._id,
    });

    if (newProduct) {
        res.status(200).json("Added a new product!");
    } else {
        res.status(400);
        throw new Error("Adding product failed");
    }
});

export const removeProduct = asyncHandler(
    async (req: Request, res: Response) => {
        const { productId } = req.query;

        try {
            await Product.findByIdAndDelete(productId);

            res.status(200).json("Product deleted!");
        } catch (error) {
            res.status(500);
            throw new Error("Deleting failed! Try again");
        }
    }
);

export const updateProduct = asyncHandler(
    async (req: Request, res: Response) => {
        const { productId } = req.query;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            req.body
        );

        if (updatedProduct) {
            if (req.file && updatedProduct.productImg) {
                const img = await uploadImg(req.file);
                const newProductImg = {
                    id: img.asset_id,
                    url: img.url,
                };

                // delete the previous img
                await deleteImg(updatedProduct.productImg.id);
                // save the new img to db
                updatedProduct.productImg = newProductImg;
                await updatedProduct.save();
            }

            res.status(200).json("Product updated!");
        } else {
            res.status(400);
            throw new Error("Failed to update product");
        }
    }
);

import mongoose, { InferSchemaType, ObjectId } from "mongoose";

export const cartSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productImg: {
        url: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stocks: {
        type: Number,
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    inCart: {
        type: Number,
        required: true,
    },
    itemOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export type CartType = InferSchemaType<typeof cartSchema>;

export default mongoose.model<CartType>("Cart", cartSchema);

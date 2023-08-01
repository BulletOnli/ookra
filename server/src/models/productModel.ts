import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
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
    sold: Number,
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export type productType = mongoose.InferSchemaType<typeof productSchema>;

export default mongoose.model<productType>("Product", productSchema);

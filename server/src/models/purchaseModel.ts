import mongoose, { InferSchemaType } from "mongoose";

const purchaseSchema = new mongoose.Schema(
    {
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
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        totalSpent: {
            type: Number,
            required: true,
        },
        purchaseOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export type purchaseSchemaType = InferSchemaType<typeof purchaseSchema>;

export default mongoose.model<purchaseSchemaType>("Purchase", purchaseSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    cart: Array,
    totalSales: {
        type: Number,
        default: 0,
    },
});

export type userType = mongoose.InferSchemaType<typeof userSchema>;
export default mongoose.model<userType>("User", userSchema);

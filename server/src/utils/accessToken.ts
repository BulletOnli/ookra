import jwt from "jsonwebtoken";

export const generateAccessToken = (_id: string) => {
    return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "10m",
    });
};

export const generateRefreshToken = (_id: string) => {
    return jwt.sign({ _id }, process.env.REFRESH_TOKEN_SECRET!, {
        expiresIn: "1d",
    });
};

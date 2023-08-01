import bcrypt from "bcrypt";

export const hassPassword = async (password: string) => {
    return await bcrypt.hash(password, 12);
};

export const confirmPassword = async (
    password: string,
    hashedPassword: string
) => {
    return await bcrypt.compare(password, hashedPassword);
};

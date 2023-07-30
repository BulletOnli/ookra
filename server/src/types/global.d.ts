import { userType } from "src/models/userModel";

type User = {
    _id: string;
} & userType;

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

export {};

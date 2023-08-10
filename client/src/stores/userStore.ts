import { fetchAccountDetails } from "@/src/api/userApi";
import { create } from "zustand";

export type UserType = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    totalSales?: number;
    _id: string;
};

type UserState = {
    accountDetails: UserType | null;
    getAccountDetails: () => Promise<void>;
    logoutUser: () => void;
};

const useUserStore = create<UserState>((set) => ({
    accountDetails: null,
    getAccountDetails: async () => {
        const response = await fetchAccountDetails();

        if (response) {
            set({ accountDetails: response });
        }
    },
    logoutUser: () => {
        localStorage.removeItem("ookraToken");
        set({ accountDetails: null });
    },
}));

export default useUserStore;

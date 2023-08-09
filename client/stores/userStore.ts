import { fetchAccountDetails } from "@/api/userApi";
import { create } from "zustand";

export type UserType = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    totalSales?: number;
};

type UserState = {
    isLoggedIn: boolean | null;
    accountDetails: UserType | null;
    getAccountDetails: () => Promise<void>;
    logoutUser: () => void;
};

const useUserStore = create<UserState>((set) => ({
    isLoggedIn: false,
    accountDetails: null,
    getAccountDetails: async () => {
        const response = await fetchAccountDetails();
        set({ accountDetails: response, isLoggedIn: true });
    },
    logoutUser: () => {
        localStorage.removeItem("ookraToken");
        set({ accountDetails: null, isLoggedIn: false });
    },
}));

export default useUserStore;

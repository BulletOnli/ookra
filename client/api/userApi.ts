import { UserType } from "@/src/stores/userStore";
import axios from "axios";

const API: string = "http://localhost:5050/user";

export const fetchAccountDetails = async () => {
    const response = await axios.get(`${API}/account/details`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("ookraToken")}`,
        },
    });

    return response.data;
};

export const registerUser = async (data: UserType) => {
    const response = await axios.post(`${API}/register`, data);

    if (response.data.token) {
        localStorage.setItem("ookraToken", response.data.token);
    }
};

export const loginUser = async (data: {
    username: string;
    password: string;
}) => {
    const response = await axios.post(`${API}/login`, data);

    if (response.data.token) {
        localStorage.setItem("ookraToken", response.data.token);
    }
};

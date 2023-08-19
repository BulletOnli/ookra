import axios from "axios";

const API: string = "http://localhost:5050/auth";

type RegisterDetailsType = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    role: string;
};

export const registerUser = async (data: RegisterDetailsType) => {
    const response = await axios.post(`${API}/register`, data, {
        withCredentials: true,
    });

    if (response.data.token) {
        localStorage.setItem("ookraToken", response.data.token);
    }

    return response.data;
};

export const loginUser = async (data: {
    username: string;
    password: string;
}) => {
    const response = await axios.post(`${API}/login`, data, {
        withCredentials: true,
    });

    if (response.data.token) {
        localStorage.setItem("ookraToken", response.data.token);
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.post(`${API}/logout`, null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("ookraToken")}`,
            },
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

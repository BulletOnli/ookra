import axios from "axios";

const API: string = "http://localhost:5050/user";

// fetch the details of the account user (logged in)
export const fetchAccountDetails = async () => {
    const response = await axios.get(`${API}/account/details`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("ookraToken")}`,
        },
    });

    return response.data;
};

// fetch the details of the specific user
export const fetchUserDetails = async (userId: string) => {
    const response = await axios.get(`${API}/details?userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("ookraToken")}`,
        },
    });

    return response.data;
};

type RegisterDetailsType = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
};

export const registerUser = async (data: RegisterDetailsType) => {
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

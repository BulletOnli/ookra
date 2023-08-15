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

import axios from "axios";

const API = "http://localhost:5050/cart";

export const getCartItems = async (userId: string) => {
    const response = await axios.get(`${API}/all?userId=${userId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("ookraToken")}`,
        },
    });

    return response.data;
};

export const addToCart = async (productId: string, quantity: number) => {
    const response = await axios.post(
        `${API}/add?productId=${productId}`,
        { quantity },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("ookraToken")}`,
            },
        }
    );

    return response.data;
};

export const removeToCart = async (productId: string) => {
    const response = await axios.delete(
        `${API}/remove?productId=${productId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("ookraToken")}`,
            },
        }
    );

    return response.data;
};

export const cartCheckout = async (userId: string) => {
    const response = await axios.post(
        `${API}/checkout?userId=${userId}`,
        null,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("ookraToken")}`,
            },
        }
    );

    return response.data;
};

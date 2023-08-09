import axios from "axios";

const API: string = "http://localhost:5050/product";

export const getAllProducts = async () => {
    const response = await axios.get(`${API}/all`);

    return response.data;
};

export const getSingleProduct = async (productId: string) => {
    const response = await axios.get(`${API}?productId=${productId}`);

    return response.data;
};

import axios from "axios";

const API = "http://localhost:5050/cart";

export const getCartItems = async () => {
    const response = await axios.get(`${API}/all`);

    return response.data;
};

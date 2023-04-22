import { Fetch, FetchGET } from "./Admin";
import { DeleteRequest } from "./commonCall";
const baseUrl = import.meta.env.VITE_defaultURL;

export const getLogin = async (bodyData) => {

    const config = {
        'Content-Type': 'application/json'
    };
    const data = await fetch(`${baseUrl}/user/login`, {
        headers: config,
        body: JSON.stringify(bodyData),
        method: "POST"
    });


    const res = await data.json();
    return res;
}

export const postRegister = async (bodyData) => {
    const config = {
        'Content-Type': 'application/json'
    };

    const data = await fetch(`${baseUrl}/user/register`, {
        method: "POST",
        headers: config,
        body: JSON.stringify(bodyData)
    });

    return await data.json();
}

export const getCartItems = async () => {
    const data = await FetchGET(`/cart/items`);
    return data;
}

export const updateCartItem = async (productId, quantity) => {
    const data = await Fetch(`/cart/update-item/${productId}`, { quantity }, "PUT");
    return data;
}

export const removeItemFromCart = async (productId) => {
    const data = await DeleteRequest(`/cart/remove-item/${productId}`);
    return data;
}

export const verifyOtp = async (bodyData) => {
    const config = {
        'Content-Type': 'application/json'
    };
    const data = await fetch(`${baseUrl}/user/verify-email`, {
        method: "POST",
        headers: config,
        body: JSON.stringify(bodyData)
    });

    return await data.json();
}

export const resendOtp = async (bodyData) => {
    const config = {
        'Content-Type': 'application/json'
    };
    const data = await fetch(`${baseUrl}/user/send-new-otp`, {
        method: "POST",
        headers: config,
        body: JSON.stringify(bodyData)
    });
    return await data.json();
}
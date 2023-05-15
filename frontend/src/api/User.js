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

    if (res.status === "FAILURE" || res.status === "ERROR")
        throw res;
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
    const res = await data.json();

    if (res.status === "FAILURE" || res.status === "ERROR")
        throw res;
    return res;
}

export const getCartItems = async () => {
    const data = await FetchGET(`/cart/items`);
    if (data.status === "FAILURE" || data.status === "ERROR")
        throw data;
    return data;
}

export const updateCartItem = async (productId, quantity) => {
    const data = await Fetch(`/cart/update-item/${productId}`, { quantity }, "PUT");
    if (data.status === "FAILURE" || data.status === "ERROR")
        throw data;
    return data;
}

export const removeItemFromCart = async (productId) => {
    const data = await DeleteRequest(`/cart/remove-item/${productId}`);
    if (data.status === "FAILURE" || data.status === "ERROR")
        throw data;
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

export const getAddress = async () => {
    const data = await FetchGET('/user/address');
    if (data.status === "FAILURE" || data.status === "ERROR") {
        throw data
    }
    return data;
}

export const createUserAddress = async (addressData) => {
    const data = await Fetch('/user/address', addressData, "POST");
    if (data.status === "FAILURE" || data.status === "ERROR") {
        throw data
    }
    return data;
}

export const updateAddressData = async (addressId, addressData) => {
    const data = await Fetch(`/user/address/${addressId}`, addressData, "PUT");
    if (data.status === "FAILURE" || data.status === "ERROR") {
        throw data
    }
    return data;
}

export const makeChangePassword = async (userData) => {
    const data = await Fetch('/user/change-password', userData, "PUT");
    if (data.status === "FAILURE" || data.status === "ERROR") {
        throw data
    }
    return data;
}

export const makeChangeEmail = async (userData) => {
    const data = await Fetch('/user/change-email', userData, "PUT");

    if (data.status === "FAILURE" || data.status === "ERROR") {
        throw data
    }
    return data;
}


export const getUserDetails = async () => {
    const data = await FetchGET('/user/details');

    if (data.status === "FAILURE" || data.status === "ERROR") {
        throw data
    }
    console.log(data);
    return data;
}

export const getOrderList = async () => {
    const data = await FetchGET(`/order/all`);
    if (data?.status === "ERROR" || data.status === "FAILURE") {
        throw data;
    }
    return data;
}

export const getOrderItems = async (orderId) => {
    const data = await FetchGET(`/order/items/${orderId}`);
    if (data?.status === "ERROR" || data.status === "FAILURE") {
        throw data;
    }
    return data;
}

export const forgetPassowrd = async (email) => {
    const config = {
        'Content-Type': 'application/json'
    };
    const data = await fetch(`${baseUrl}/user/forget-password`, {
        headers: config,
        body: JSON.stringify({ email }),
        method: "POST"
    });

    const res = await data.json();

    if (res.status === "FAILURE" || res.status === "ERROR")
        throw res;
    return res;
}

export const resetPassowrd = async (passwordData) => {

    const config = {
        'Content-Type': 'application/json'
    };
    const data = await fetch(`${baseUrl}/user/reset-password`, {
        headers: config,
        body: JSON.stringify(passwordData),
        method: "PUT"
    });

    const res = await data.json();

    if (res.status === "FAILURE" || res.status === "ERROR")
        throw res;
    return res;
}

export const getWishlist = async () => {
    const data = await FetchGET(`/user/wishlist`);
    if (data?.status === "ERROR" || data.status === "FAILURE") {
        throw data;
    }
    return data;
}

export const addToWishlist = async (productId) => {
    const data = await Fetch(`/user/wishlist/${productId}`,{},"POST");
    if (data?.status === "ERROR" || data.status === "FAILURE") {
        throw data;
    }
    return data;
}

export const removeFromWishlist = async (productId) => {
    const data = await Fetch(`/user/wishlist/${productId}`,{},"DELETE");
    if (data?.status === "ERROR" || data.status === "FAILURE") {
        throw data;
    }
    return data;
}

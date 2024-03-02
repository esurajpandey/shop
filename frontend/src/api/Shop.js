import { Fetch, FetchGET } from "./Admin";

export const getProducts = async (query) => {
    const data = await FetchGET(`/product/all?${query}`);
    if (data.status === "FAILURE" || data.status === "ERROR")
        throw data;
    return data;
}

export const getProduct = async (productId) => {
    const data = await FetchGET(`/product/${productId}`);
    if (data.status === "FAILURE" || data.status === "ERROR")
        throw data;
    return data;
}


export const addToCart = async (productId) => {
    const data = await Fetch(`/cart/add-item/${productId}`, {}, "POST");
    if (data.status === "ERROR" || data.status === "FAILURE")
        throw data;
    return data;
}

export const removeItemFromCart = async (productId) => {
    const data = await Fetch(`/cart/remove-item/${productId}`, "DELETE");

    if (data.status === "ERROR" || data.status === "FAILURE")
        throw data;
    return data;
}

export const orderNow = async (orderData) => {
    const data = await Fetch('/order/order-now', orderData, "POST");

    if (data.status === "ERROR" || data.status === "FAILURE")
        throw data;
    return data;
}

export const placeOrder = async (paymentMode) => {
    const data = await Fetch('/order/place-order', paymentMode, "POST");

    if (data.status === "ERROR" || data.status === "FAILURE")
        throw data;
    return data;
}

export const cancelOrder = async (orderId) => {
    const data = await Fetch(`/order/cancel/${orderId}`, {}, "PUT");
    if (data.status === "ERROR" || data.status === "FAILURE")
        throw data;
    return data;
}

export const addReview = async (reviewData) => {
    const data = await Fetch('/order/add-review', reviewData, "POST");
    if (data.status === "ERROR" || data.status === "FAILURE")
        throw data;
    return data;
}

export const editReview = async () => {

}

export const removeReview = async () => {

}
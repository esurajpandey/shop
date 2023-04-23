import { Fetch, FetchGET } from "./Admin";

export const getProducts = async (page) => {
    const data = await FetchGET('/product/all');
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


export const addToCart = async () => {

}

export const removeItemFromCart = () => {

}

export const orderNow = async () => {

}

export const placeOrder = () => {

}

export const cancelOrder = async () => {

}

export const addReview = async () => {

}

export const editReview = async () => {

}

export const removeReview = async () => {

}
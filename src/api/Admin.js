import axios from "axios";

const baseUrl = import.meta.env.VITE_defaultURL;

export const getWorkers = async (page) => {
    const data = await FetchGET(`/admin/workers?page${page}`)
    return data;
}

export const Fetch = async (urlPath, bodyData, method) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
        Authorization: `bearer ${user.token}`,
        'Content-Type': "application/json"
    };

    const res = await fetch(`${baseUrl}${urlPath}`, {
        method,
        headers: config,
        body: JSON.stringify(bodyData)
    });

    return await res.json();
}

export const FetchGET = async (urlPath) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
        Authorization: `bearer ${user.token}`
    }

    const fetchRes = await fetch(`${baseUrl}${urlPath}`, {
        method: "GET",
        headers: config
    });
    const data = await fetchRes.json();
    return data;
}

export const updateWorker = async (workerId, workerData) => {
    const data = await Fetch(`/admin/update-worker/${workerId}`, workerData, "PUT")
    return data;
}

export const createWorker = async (workerData) => {
    const data = await Fetch(`/admin/worker`, workerData, "POST");
    return data;
}

export const convertCustToWorker = async (workerData) => {
    const data = await Fetch(`/admin/customer-to-worker`, workerData, "POST");
    return data;
}

export const getSuppliers = async () => {
    const data = await FetchGET(`/admin/suppliers`);
    return data;
}

export const createSupplier = async (supplierData) => {
    const data = await Fetch(`/admin/supplier`, supplierData, "POST");
    return data;
}

export const updateSupplier = async (supplierId, supplierData) => {
    const data = await Fetch(`/admin/update-supplier/${supplierId}`, supplierData, "PUT")
    return data;
}

export const getBrands = async () => {
    const data = await FetchGET('/product/brands');
    return data;
}

export const getColors = async () => {
    const data = await FetchGET('/product/colors');
    return data;
}

export const getCategories = async () => {
    const data = await FetchGET('/product/categories');
    return data;
}

export const addProduct = async (productData) => {
    try {
        const data = await Fetch('/product', productData, "POST");
        return data;
    } catch (err) {
        throw err;
    }
}

export const getProductList = async (page) => {
    const data = await FetchGET(`/product/all?page=${page}`);
    if (data.status === "FAILURE" || data.status === "ERROR")
        throw data;
    return data;
}

export const updateDeliveryStatus = async (deliveryStatus, orderId) => {
    const data = await Fetch(`/order/update-delivery-status/${orderId}`, { deliveryStatus }, "PUT");
    if (data.status === "FAILURE" || data.status === "ERROR")
        throw data;
    return data;
}

export const updateOrder = async (updatedata, orderId) => {
    const data = await Fetch(`/admin/update-order/${orderId}`, updatedata, "PUT");

    if (data.status === "FAILURE" || data.status === "ERROR")
        throw data;
    return data;
}

export const assignWorker = async (orderId, workerId) => {
    const data = await Fetch(`/admin/assign-order-worker/${orderId}`, { workerId }, "PUT");

    if (data.status === "FAILURE" || data.status === "ERROR")
        throw data;
    return data;
}

export const getAllDelivery = async () => {
    const data = await FetchGET('/order/delivery');
    if (data.status === "FAILURE" || data.status === "ERROR")
        throw data;
    return data;
}

export const getAllOrders = async (query) => {
    const data = await FetchGET(`/admin/orders?${query}`);
    if (data.status === "FAILURE" || data.status === "ERROR")
        throw data;
    return data;
}

export const getAnalytics = async (query) => {
    const data = await FetchGET(`/admin/analytics?${query}`);
    if (data.status === "FAILURE" || data.status === "ERROR")
        throw data;
    return data;
}

export const updateProduct = async (productId, productData) => {
    const data = await Fetch(`/product/update/${productId}`, productData, "PUT");
    if (data.status === "FAILURE" || data.status === "ERROR")
        throw data;
    return data;
}

export const deleteProduct = async (productId) => {
    const data = await Fetch(`/admin/product/${productId}`, {}, "DELETE");
    if (data.status === "FAILURE" || data.status === "ERROR")
        throw data;
    return data;
}

export const removeSupplier = async (supplierId) => {
    const data = await Fetch(`/admin/remove-supplier/${supplierId}`, {}, "DELETE");
    if (data.status === "FAILURE" || data.status === "ERROR")
        throw data;
    return data;
}

export const removeWorker = async (workerId) => {

    const data = await Fetch(`/admin/remove-worker/${workerId}`, {}, "DELETE");
    if (data.status === "FAILURE" || data.status === "ERROR")
        throw data;
    return data;
}

export const addBrand = async (brandName) => {
    const data = await Fetch('/product/brand', { brandName }, "POST");
    if (data.status === "FAILURE" || data.status === "ERROR")
        throw data;
    return data;
}

export const addCategory = async (category) => {
    const data = await Fetch('/product/category', { category }, "POST");

    if (data.status === "FAILURE" || data.status === "ERROR") {
        throw data;
    }
    return data;
}


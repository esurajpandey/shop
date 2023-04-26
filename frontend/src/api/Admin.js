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

    const user = JSON.parse(localStorage.getItem('user'))
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

export const getProductList = async () => {
    const data = await FetchGET('/product/all');
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

export const getAllDelivery = async () => {
    const data = await FetchGET('/order/delivery');
    if (data.status === "FAILURE" || data.status === "ERROR")
        throw data;
    return data;
}






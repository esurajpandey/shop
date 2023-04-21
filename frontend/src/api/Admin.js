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

}

export const getSuppliers = async () => {

}

export const createSupplier = async (supplierData) => {

}

export const updateSupplier = async (supplierData) => {

}
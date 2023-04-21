import { Fetch, FetchGET } from "./Admin";
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

export const register = async (bodyData) => {
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
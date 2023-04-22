const baseUrl = import.meta.env.VITE_defaultURL;
export const DeleteRequest = async (urlPath) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
        Authorization: `bearer ${user.token}`,
    };

    const res = await fetch(`${baseUrl}${urlPath}`, {
        method: "DELETE",
        headers: config,
    });

    return await res.json();
}

export const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user)
        throw "User does not exist"
    return user;
}
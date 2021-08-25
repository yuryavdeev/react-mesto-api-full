import { urlFetch } from "./utils";

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
}

export const register = async ({ password, email }) => {
    const res = await fetch(`${urlFetch}/signup`, {
        credentials: "include",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password,
            email: email
        })
    });
    return checkResponse(res);
}

export const authorize = async ({ password, email }) => {
    const res = await fetch(`${urlFetch}/signin`, {
        credentials: "include",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password,
            email: email
        })
    });
    return checkResponse(res);
}

export const checkAuth = async () => {
    const res = await fetch(`${urlFetch}/users/me`, {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return checkResponse(res);
}

export const deleteAuth = async () => {
    const res = await fetch(`${urlFetch}/signout`, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return checkResponse(res);
}
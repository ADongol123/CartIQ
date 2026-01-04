import { ApiPromise, AuthenticatedUser, SignUpPayload } from "@/global-types";
import { getCookie, setCookie } from "@/helper/cookieHelper";
import { post,get } from "@/lib/fetcher";
import { cache } from "react";

export async function register(payload: SignUpPayload): Promise<ApiPromise> {
    try {
        const res = await post('auth/register', payload);
        if (res.success) {
            setAuthToken(res.data.token);
        }
        return res;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function login(payload: any): Promise<ApiPromise> {
    try {
        const res = await post('auth/login', payload);
        if (res.success) {
            setAuthToken(res.data.token);
        }
        console.log(res);
        return res;
    } catch (err) {
        console.log('error occured ' ,err);
        throw err;
    }
}

export async function getAuthUser(token: string): Promise<ApiPromise> {
    try {
        const data = await get('auth/user', token);
        return data;
    } catch (err) {
        throw err;
    }
}

export const getSession = cache(async (token: string) => {
    return (await getAuthUser(token)).data as AuthenticatedUser;
});

export function setAuthToken(token: string) {
    setCookie({
        name: 'auth_token',
        value: token
    })
}

export function getAuthToken() {
    return getCookie('auth_token');
}

export async function forgotPassword(mail: string): Promise<ApiPromise> {
    try {
        const res = await post("api/auth/forgot-password", {
            email: mail,
        });
        return res;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
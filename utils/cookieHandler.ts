import Cookies from "js-cookie";
import { UserAuth } from "@/types/custom";

// TODO: Env?
const COOKIE_STORAGE_NAME = "mt-frontend"

const getUserAuthCookie = (): UserAuth => {
    const user = Cookies.get(COOKIE_STORAGE_NAME)
    if (!user) return {
        id: "",
        email: "",
        token: ""
    }
    try {
        const userJSON = JSON.parse(user)
        return userJSON
    } catch (e) {
        throw e
    }
}

const setUserAuthCookie = (token: string) => {
    if (token) {
        Cookies.set(COOKIE_STORAGE_NAME, token)
    }
}

const clearUserAuthCookie = (token: string) => {
    if (token) {
        Cookies.remove(COOKIE_STORAGE_NAME)
    }
}

// Parses and returns stored auth cookie for JWT Token
const getUserJWTToken = (): string => {
    const user = getUserAuthCookie()
    if (!user || !user.token) return ""
    return user.token
}

export {
    getUserAuthCookie,
    setUserAuthCookie,
    clearUserAuthCookie,
    getUserJWTToken,
}
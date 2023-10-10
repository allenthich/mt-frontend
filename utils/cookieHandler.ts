import Cookies from "js-cookie";

// TODO: Env?
const COOKIE_STORAGE_NAME = "mt-frontend"

const getUserAuthCookie = (): string | undefined => {
    return Cookies.get(COOKIE_STORAGE_NAME)
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
const getUserJWTToken = (): string | undefined => {
    const user = getUserAuthCookie()
    if (!user) return undefined

    try {
        const userJSON = JSON.parse(user)
        return userJSON.token
    } catch (e) {
        throw e
    }
}

export {
    getUserAuthCookie,
    setUserAuthCookie,
    clearUserAuthCookie,
    getUserJWTToken,
}
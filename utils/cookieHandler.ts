import Cookies from "js-cookie";

const COOKIE_STORAGE_NAME = "mt-frontend"

const storeJWTToken = (token: string) => {
    if (token) {
        Cookies.set(COOKIE_STORAGE_NAME, token)
    }
}

const getJWTToken = () => {
    return Cookies.get(COOKIE_STORAGE_NAME)
}

export {
    storeJWTToken,
    getJWTToken
}
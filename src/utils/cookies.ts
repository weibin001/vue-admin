import cookies from 'js-cookie'

export const getCookie = (key: string) => cookies.get(key)
export const setCookie = (key: string, value: string) => cookies.set(key, value)
export const removeCookie = (key: string) => cookies.remove(key)

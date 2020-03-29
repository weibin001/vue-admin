import cookies from 'js-cookie'

export const getCookie = (key: string) => cookies.get(key)
export const setCookie = (key: string, value: string, option?: { expires: number }) => cookies.set(key, value, option)
export const removeCookie = (key: string) => cookies.remove(key)

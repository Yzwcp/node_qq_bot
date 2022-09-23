import { betterRequest } from "./mRequest";

export default new betterRequest({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    interceptors: {},
});

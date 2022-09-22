import { MRequest } from "./mRequest";

export default new MRequest({
    baseURL: import.meta.env.BASE_URL,
    interceptors: {},
});

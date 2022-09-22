import { mRequest } from "./mRequest";

export default new mRequest({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    interceptors: {},
});

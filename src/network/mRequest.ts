import axios, { AxiosInstance } from "axios";
import type { ImRequestInterceptors, ImRequestConfig } from "@/network/types";
import { ElLoading } from "element-plus";
// import { LoadingInstance } from "element-plus/es/components/loading/src/loading";
export class betterRequest {
    instance: AxiosInstance;
    interceptors?: ImRequestInterceptors; //扩展拦截器
    constructor(config: ImRequestConfig) {
        this.instance = axios.create(config);
        this.interceptors = config?.interceptors;

        //单个实例拦截器
        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptor, //赋值给axios请求成功
            this.interceptors?.requestInterceptorCatch //赋值给axios请求失败
        );
        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptor, //赋值给axios响应成功
            this.interceptors?.responseInterceptorCatch //赋值给axios响应失败
        );

        //所有实例拦截器
        this.instance.interceptors.request.use(
            (config) => {
                return config;
            },
            (err) => err
        );
        this.instance.interceptors.response.use(
            (res) => {
                return res.data;
            },
            (err) => {
                if (err.response.status === 404) {
                    console.log(404);
                }
            }
        );
    }

    request<T>(config: ImRequestConfig<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            // loading
            if (config.loading) {
                config.loading.value = true;
            }
            //单独请求的拦截
            if (config.interceptors?.requestInterceptor) {
                config = config.interceptors.requestInterceptor(config);
            }
            this.instance
                .request<any, T>(config)
                .then((res) => {
                    if (config.interceptors?.responseInterceptor) {
                        res = config.interceptors.responseInterceptor(res);
                    }
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
                .finally(() => {
                    if (config.loading) {
                        config.loading.value = false;
                    }
                });
        });
    }
    get<T>(config: ImRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: "get" });
    }
    post<T>(config: ImRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: "post" });
    }
    // 例如
    // requests({
    //     url:'/aaa',
    //     interceptors:{
    //         requestInterceptor:(config)=>{
    //             return config
    //         })
    //     }
    // })
}

import axios, { AxiosInstance } from "axios";
import type { ImRequestInterceptors, ImRequestConfig } from "@/network/types";

export class MRequest {
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
            (config) => config,
            (err) => err
        );
        this.instance.interceptors.response.use(
            (config) => config,
            (err) => {
                if (err.response.status === 404) {
                    console.log(404);
                }
            }
        );
    }

    //单独请求的拦截
    request(config: ImRequestConfig) {
        if (config.interceptors?.requestInterceptor) {
            config = config.interceptors.requestInterceptor(config);
        }
        this.instance
            .request({
                url: "/dd",
                method: "get",
            })
            .then((res) => {
                if (config.interceptors?.responseInterceptor) {
                    res = config.interceptors.responseInterceptor(res);
                }
                console.log(res);
            });
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

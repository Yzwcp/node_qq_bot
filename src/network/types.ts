import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface ImRequestInterceptors {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig; //赋值给axios请求成功
    requestInterceptorCatch?: (err: any) => any; //赋值给axios请求失败
    responseInterceptor?: (config: AxiosResponse) => AxiosResponse; //赋值给axios响应成功
    responseInterceptorCatch?: (config: any) => any; //赋值给axios响应失败
}
//配置每个实例的拦截器
export interface ImRequestConfig extends AxiosRequestConfig {
    interceptors?: ImRequestInterceptors;
}

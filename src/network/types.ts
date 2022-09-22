import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface ImRequestInterceptors<T = AxiosResponse> {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig; //赋值给axios请求成功
    requestInterceptorCatch?: (err: any) => any; //赋值给axios请求失败
    responseInterceptor?: (res: T) => T; //赋值给axios响应成功  T:响应类型为泛型 所以接口这要用泛型定义 <T = AxiosResponse> 如果不传默认AxiosResponse
    responseInterceptorCatch?: (config: any) => any; //赋值给axios响应失败
}
//配置每个实例的拦截器
export interface ImRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: ImRequestInterceptors<T>;
}

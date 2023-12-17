import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class Api {
    protected api: AxiosInstance;

    public constructor(config?: AxiosRequestConfig) {
        this.api = axios.create(config);
    }

    public get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.api.get(url, config);
    }

    public post<P, T, R = AxiosResponse<T>>(
        url: string,
        params: P,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.api.post(url, params, config);
    }

    public patch<T, B, R = AxiosResponse<T>>(
        url: string,
        data?: B,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.api.patch<T, R>(url, data, config);
    }
    public put<T, B, R = AxiosResponse<T>>(
        url: string,
        data?: B,
        config?: AxiosRequestConfig
    ): Promise<R> {
        return this.api.put<T, R>(url, data, config);
    }
    public delete<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.api.delete<T, R>(url, config);
    }

    protected success<T>(response: AxiosResponse<T>): T {
        return response.data;
    }
}

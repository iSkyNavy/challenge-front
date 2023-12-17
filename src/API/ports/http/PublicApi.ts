/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "../../../Utils/constants";
import { Api } from "./Api";
import { AxiosRequestConfig } from "axios";

export class PublicApi extends Api {
    public constructor(config?: AxiosRequestConfig) {
        super({ ...config, baseURL: API_URL });

        this.api.interceptors.request.use(async (param: any) => {
            return {
                ...param,
                url: `${param.url}`
            };
        });
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { ILinkPagination, IMetaPagination } from "./General";

export interface IApiResponse<T = any> {
    data: T;
    message: string;
    errors?: boolean;
    code: number;
}
export interface IApiResponseWithPagination<T = any> {
    data: T;
    links?: ILinkPagination;
    meta?: IMetaPagination;
    message: string;
    errors?: boolean;
    code: number;
}

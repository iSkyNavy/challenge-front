export interface MetParams {
    per_page?: number;
    page?: number;
}
export interface ILinkPagination {
    first: string;
    last: string;
    prev: string;
    next: string;
}
export interface IMetaPagination {
    current_page: number;
    from: number;
    last_page: number;
    links: IMetaLink[];
    path: string;
    per_page: number;
    to: number;
    total: number
}
interface IMetaLink {
    url: string;
    label: string;
    active: boolean
}
export interface IDepartament {
    id: number;
    name: string;
}
export interface IProvince {
    id: number;
    name: string;
    departament_id: number;
    departament: IDepartament;
}
export interface IDistrict {
    id: number;
    name: string;
    province_id: number;
    departament_id: number;
    province: IProvince;
    departament: IDepartament;
}

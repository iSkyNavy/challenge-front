import { ILinkPagination, IMetaPagination, MetParams } from "./General";

export interface DivisionParams extends MetParams {
    id?: number;
    name?: string | string[];
    divisionSuperiorName?: string | string[];
    sort?: string;
}
export interface IDivisionWithPagination {
    data: IDivision[];
    links?: ILinkPagination;
    meta?: IMetaPagination;
}
export interface IDivision {
    id: number;
    name: string;
    level: number;
    ambassadorName: string;
    divisionSuperiorId: string;
    collaboratorsCount?: number;
    subDivisionsCount?: number;
    divisionSuperior?: IDivision;
    subDivisions?: IDivision[]
}

import { ILinkPagination, IMetaPagination, MetParams } from "./General";

export interface DivisionParams extends MetParams {
    id?: number;
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

import { DivisionParams, IDivision, IDivisionWithPagination } from "../models/Division";
import { IApiResponse, IApiResponseWithPagination } from "../models/Response";
import { PublicApi } from "../ports/http/PublicApi";

class DivisionRepository extends PublicApi {
    private prefix = "division";

    public async getDivisions(params?: DivisionParams): Promise<IDivisionWithPagination> {
        const response = await this.get<IApiResponseWithPagination<IDivision[]>>(`${this.prefix}`, {
            params: params,
        });
        return response.data;
    }
    public async getDivision(params: DivisionParams): Promise<IDivision> {
        const response = await this.get<IApiResponse<IDivision>>(`${this.prefix}/${params.id}`);
        const { data } = this.success(response);
        return data;
    }
    public async getDivisionsName(): Promise<string[]> {
        const response = await this.get<IApiResponse<string[]>>(`${this.prefix}/names`);
        const { data } = this.success(response);
        return data;
    }

    public async getDivisionsSuperiorName(): Promise<string[]> {
        const response = await this.get<IApiResponse<string[]>>(`${this.prefix}/superior/names`);
        const { data } = this.success(response);
        return data;
    }
}

export const divisionRepository = new DivisionRepository();

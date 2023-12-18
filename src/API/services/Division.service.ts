import { DivisionParams, IDivision, IDivisionWithPagination } from "../models/Division";
import { divisionRepository } from "../repositories/Division.repository";


class DivisionService {
    public async getDivisions(params?: DivisionParams): Promise<IDivisionWithPagination> {
        const divisions = await divisionRepository.getDivisions(params);
        return divisions;
    }
    public async getDivision(params: DivisionParams): Promise<IDivision> {
        const division = await divisionRepository.getDivision(params);
        return division;
    }
    public async getDivisionsName(): Promise<string[]> {
        const names = await divisionRepository.getDivisionsName();
        return names;
    }
    public async getDivisionsSuperiorName(): Promise<string[]> {
        const names = await divisionRepository.getDivisionsSuperiorName();
        return names;
    }
}
export const divisionService = new DivisionService();

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { divisionService } from "../../API/services/Division.service"
import { DivisionParams, IDivisionWithPagination } from "../../API/models/Division";

export const useTableHook = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [divisions, setDivisions] = useState<IDivisionWithPagination>();
    const [divisionsName, setDivisionsName] = useState<string[]>([]);
    const [divisionsSuperiorsName, setDivisionsSuperiorsName] = useState<string[]>([]);
    const getDivisions = async (params: DivisionParams) => {
        setIsLoading(true)
        const divisions = await divisionService.getDivisions({ per_page: params?.per_page ? params.per_page : 10, ...params });
        setIsLoading(false)
        setDivisions(divisions)
    }

    const getDivisionsName = async () => {
        const names = await divisionService.getDivisionsName();
        setDivisionsName(names);
    }

    const getDivisionsSuperiorName = async () => {
        const names = await divisionService.getDivisionsSuperiorName();
        setDivisionsSuperiorsName(names);
    }

    return { getDivisions, isLoading, divisions, divisionsName, getDivisionsName, getDivisionsSuperiorName, divisionsSuperiorsName }
}
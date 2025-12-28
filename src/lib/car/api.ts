import {
  CategoriesApiResponse,
  CategoryResponse,
  ManTypeResponse,
  ModelResponse,
  ModelsApiResponse,
  VehicleFilterValues,
  VehicleResponse,
  VehiclesApiResponse,
} from "../../../types/types";
import { fetchData } from "../http";

export function getManufacturers(): Promise<ManTypeResponse[]> {
  const manTypes = fetchData(`https://static.my.ge/myauto/js/mans.json`);
  return manTypes as Promise<ManTypeResponse[]>;
}

export function getCategories(): Promise<CategoryResponse[]> {
  return fetchData<CategoriesApiResponse>(
    `https://api2.myauto.ge/ka/cats/get`
  ).then((res) => res.data);
}

export function getModelsByManId(
  manId?: string
): Promise<ModelResponse[]> | [] {
  if (!manId) return [];

  return fetchData<ModelsApiResponse>(
    `https://api2.myauto.ge/ka/getManModels?man_id=${manId}`
  ).then((res) => res.data);
}

export function getVehicles({
  filters,
  page,
}: {
  filters: Record<string, string>;
  page: number;
}): Promise<VehicleResponse> {
  const queryParams = new URLSearchParams(filters);
  return fetchData<VehiclesApiResponse>(
    `https://api2.myauto.ge/ka/products?${queryParams.toString()}&Page=${page}`
  ).then((res) => res.data);
}

import type {
  CategoryResponse,
  ManTypeResponse,
  ModelResponse,
  VehicleResponse,
} from "../../../types/types";
import { fetchData } from "../http";

const ENDPOINTS = {
  manufacturers: "https://static.my.ge/myauto/js/mans.json",
  categories: "https://api2.myauto.ge/ka/cats/get",
  models: "https://api2.myauto.ge/ka/getManModels",
  vehicles: "https://api2.myauto.ge/ka/products",
};

type ApiDataResponse<T> = { data: T };

const fetchApiData = <T>(url: string): Promise<T> =>
  fetchData<ApiDataResponse<T>>(url).then(({ data }) => data);

const withQuery = (url: string, params: Record<string, string>) =>
  `${url}?${new URLSearchParams(params).toString()}`;

export function getManufacturers(): Promise<ManTypeResponse[]> {
  return fetchData<ManTypeResponse[]>(ENDPOINTS.manufacturers);
}

export function getCategories(): Promise<CategoryResponse[]> {
  return fetchApiData<CategoryResponse[]>(ENDPOINTS.categories);
}

export function getModelsByManId(manId?: string): Promise<ModelResponse[]> {
  if (!manId) {
    return Promise.resolve([]);
  }
  return fetchApiData<ModelResponse[]>(
    withQuery(ENDPOINTS.models, { man_id: manId })
  );
}

export function getVehicles({
  filters,
  page,
}: {
  filters: Record<string, string>;
  page: number;
}): Promise<VehicleResponse> {
  return fetchApiData<VehicleResponse>(
    withQuery(ENDPOINTS.vehicles, { ...filters, Page: String(page) })
  );
}

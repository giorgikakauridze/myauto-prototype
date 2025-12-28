export type VehicleKind = "car" | "tractor" | "moto";
export type Currency = "GEL" | "USD";

export type VehicleFilterValues = {
  kind: VehicleKind;
  dealType: "sell" | "rent";
  model: string;
  category: string;
  manufacturer: string;
  currency: Currency;
  priceFrom?: number;
  priceTo?: number;
};

export type VehicleKindItem = {
  value: VehicleKind;
  label: string;
  icon: React.ReactNode;
};

export type ManTypeResponse = {
  man_id: string;
  man_name: string;
  is_car: string;
  is_spec: string;
  is_moto: string;
};

export type CategoryResponse = {
  category_id: number;
  category_type: number;
  has_icon: number;
  title: string;
  seo_title: string;
  vehicle_types: number[];
};

export type ModelResponse = {
  model_id: number;
  man_id: number;
  model_name: string;
  model_group: string;
  sort_order: 0;
  cat_man_id: number;
  cat_model_id: number;
  cat_modif_id: number;
  is_car: boolean;
  is_moto: boolean;
  is_spec: boolean;
  show_in_salons: number;
  shown_in_slider: number;
  is_synced: number;
};

export type VehicleResponse = {
  items: {
    car_id: number;
    prod_year: number;
    man_id: number;
    car_model: string;
    engine_volume: number;
    model_id: number;
    price: number;
    price_usd: number;
    price_value: number;
    photo: string;
    photo_ver: number;
    right_wheel: boolean;
    car_run_km: number;
    order_date: string;
    views: number;
    fuel_type_id: number;
    is_payd: boolean;
    customs_passed: boolean;
    daily_views: {
      views: number;
      product_id: number;
      insert_Date: string;
    };
  }[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
};

export type VehiclesApiResponse = {
  data: VehicleResponse;
};

export type ModelsApiResponse = { data: ModelResponse[] };

export type CategoriesApiResponse = { data: CategoryResponse[] };

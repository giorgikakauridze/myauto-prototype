import { CategoryResponse, ManTypeResponse } from "../../types/types";

export function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export function filterMansByKind(kind: string, models: ManTypeResponse[]) {
  switch (kind) {
    case "car":
      return models.filter((model) => model.is_car === "1");
    case "tractor":
      return models.filter((model) => model.is_spec === "1");
    case "moto":
      return models.filter((model) => model.is_moto === "1");

    default:
      return models.filter((model) => model.is_car === "1");
  }
}

export function filterCategoryByKind(
  kind: string,
  categories: CategoryResponse[]
) {
  switch (kind) {
    case "car":
      return categories.filter((category) =>
        category.vehicle_types.includes(0)
      );

    case "tractor":
      return categories.filter((category) =>
        category.vehicle_types.includes(1)
      );

    case "moto":
      return categories.filter((category) =>
        category.vehicle_types.includes(2)
      );

    default:
      return categories.filter((category) =>
        category.vehicle_types.includes(0)
      );
  }
}

export function getDaysDifference(dateInput?: string | Date): number {
  if (!dateInput) return 0;

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return 0;

  const now = new Date();
  const diffMs = now.getTime() - date.getTime(); // ✅ past = positive

  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return Math.max(diffDays, 0);
}

export function parseFilters(sp: URLSearchParams) {
  const manufacturer = sp.get("manufacturer");
  const model = sp.get("model");
  const filters = {
    Period: sp.get("period") ?? "",
    SortOrder: sp.get("sort") ?? "",
    PriceFrom: sp.get("priceFrom") ?? "",
    PriceTo: sp.get("priceTo") ?? "",
    TypeID:
      sp.get("kind") === "moto"
        ? "2"
        : sp.get("kind") === "tractor"
          ? "1"
          : "0",
    ForRent:
      sp.get("dealType") === "rent"
        ? "1"
        : sp.get("dealType") === "sell"
          ? "0"
          : "",
    Cats: sp.get("category") ?? "",
    Mans:
      manufacturer && model
        ? `${manufacturer}.${model}`
        : manufacturer
          ? manufacturer
          : "",
    CurrencyID: sp.get("currency") === "GEL" ? "1" : "3",
  };

  return Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== "")
  );
}

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(unescape(encodeURIComponent(str)));

export const shimmer = (w: number, h: number) =>
  `data:image/svg+xml;base64,${toBase64(`
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
        <linearGradient id="g">
          <stop stop-color="#cccccc" offset="20%" />
          <stop stop-color="#cccccc" offset="50%" />
          <stop stop-color="#cccccc" offset="70%" />
        </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="#cccccc" />
        <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      </svg>
      `)}`;

export function getFuelType(fuel_type_id?: number): string {
  switch (fuel_type_id) {
    case 1:
      return "ბენზინი";
    case 2:
      return "ბენზინი";
    case 3:
      return "დიზელი";
    case 6:
      return "ჰიბრიდი";
    case 7:
      return "ელექტრო";
    case 8:
      return "გაზი";
    case 9:
      return "თხევადი გაზი";
    case 10:
      return "დატენვადი ჰიბრიდი";

    default:
      return "ბენზინი";
  }
}

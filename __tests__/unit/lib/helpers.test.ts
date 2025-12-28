import {
  cn,
  filterCategoryByKind,
  filterMansByKind,
  getDaysDifference,
  getFuelType,
  parseFilters,
} from "@/lib/helpers";

describe("lib/helpers", () => {
  test("cn joins truthy class names", () => {
    expect(cn("a", false, undefined, "b", null, "c")).toBe("a b c");
  });

  test("filterMansByKind filters by flags", () => {
    const mans = [
      { man_id: "1", man_name: "A", is_car: "1", is_spec: "0", is_moto: "0" },
      { man_id: "2", man_name: "B", is_car: "0", is_spec: "1", is_moto: "0" },
      { man_id: "3", man_name: "C", is_car: "0", is_spec: "0", is_moto: "1" },
    ];
    expect(filterMansByKind("car", mans).map((m) => m.man_id)).toEqual(["1"]);
    expect(filterMansByKind("tractor", mans).map((m) => m.man_id)).toEqual([
      "2",
    ]);
    expect(filterMansByKind("moto", mans).map((m) => m.man_id)).toEqual(["3"]);
    expect(filterMansByKind("unknown", mans).map((m) => m.man_id)).toEqual([
      "1",
    ]);
  });

  test("filterCategoryByKind filters by vehicle_types", () => {
    const categories = [
      {
        category_id: 1,
        category_type: 0,
        has_icon: 0,
        title: "Car",
        seo_title: "car",
        vehicle_types: [0],
      },
      {
        category_id: 2,
        category_type: 0,
        has_icon: 0,
        title: "Spec",
        seo_title: "spec",
        vehicle_types: [1],
      },
      {
        category_id: 3,
        category_type: 0,
        has_icon: 0,
        title: "Moto",
        seo_title: "moto",
        vehicle_types: [2],
      },
    ];
    expect(
      filterCategoryByKind("car", categories).map((c) => c.category_id)
    ).toEqual([1]);
    expect(
      filterCategoryByKind("tractor", categories).map((c) => c.category_id)
    ).toEqual([2]);
    expect(
      filterCategoryByKind("moto", categories).map((c) => c.category_id)
    ).toEqual([3]);
    expect(
      filterCategoryByKind("unknown", categories).map((c) => c.category_id)
    ).toEqual([1]);
  });

  test("getDaysDifference returns 0 for invalid input and positive days for past", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-01-10T00:00:00.000Z"));

    expect(getDaysDifference(undefined)).toBe(0);
    expect(getDaysDifference("not-a-date")).toBe(0);
    expect(getDaysDifference("2025-01-09T00:00:00.000Z")).toBe(1);
    expect(getDaysDifference("2025-01-01T00:00:00.000Z")).toBeGreaterThan(1);

    jest.useRealTimers();
  });

  test("parseFilters maps UI params to API filters and drops empties", () => {
    const sp = new URLSearchParams({
      kind: "tractor",
      dealType: "rent",
      manufacturer: "10",
      model: "20",
      category: "30",
      currency: "USD",
      priceFrom: "100",
      priceTo: "200",
      sort: "3",
      period: "12h",
    });

    expect(parseFilters(sp)).toEqual({
      Period: "12h",
      SortOrder: "3",
      PriceFrom: "100",
      PriceTo: "200",
      TypeID: "1",
      ForRent: "1",
      Cats: "30",
      Mans: "10.20",
      CurrencyID: "3",
    });
  });

  test("parseFilters default currency is GEL(1) and default kind is car(TypeID=0)", () => {
    const sp = new URLSearchParams({ currency: "GEL" });
    expect(parseFilters(sp)).toEqual({ TypeID: "0", CurrencyID: "1" });
  });

  test("getFuelType maps known ids and defaults", () => {
    expect(getFuelType(1)).toBe("ბენზინი");
    expect(getFuelType(3)).toBe("დიზელი");
    expect(getFuelType(7)).toBe("ელექტრო");
    expect(getFuelType(999)).toBe("ბენზინი");
    expect(getFuelType(undefined)).toBe("ბენზინი");
  });
});

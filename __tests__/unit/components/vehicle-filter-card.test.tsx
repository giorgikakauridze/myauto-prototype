import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VehicleFilterCard from "@/components/vehicle/vehicle-filter-card";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => ({
    toString: () => "existing=1",
  }),
}));

const useQueryMock = jest.fn();
jest.mock("@tanstack/react-query", () => ({
  useQuery: (args: any) => useQueryMock(args),
}));

describe("VehicleFilterCard", () => {
  beforeEach(() => {
    push.mockClear();
    useQueryMock.mockReset();
  });

  test("submits filters into URL query params (deleting empty values)", async () => {
    const user = userEvent.setup();

    useQueryMock.mockImplementation(({ queryKey }: any) => {
      if (queryKey?.[0] === "categories") {
        return {
          data: [
            {
              category_id: 10,
              category_type: 0,
              has_icon: 0,
              title: "Sedan",
              seo_title: "sedan",
              vehicle_types: [0],
            },
          ],
          isLoading: false,
        };
      }
      if (queryKey?.[0] === "models") {
        return {
          data: [{ model_id: 100, model_name: "Prius" }],
          isLoading: false,
        };
      }
      return { data: undefined, isLoading: false };
    });

    render(
      <VehicleFilterCard
        allMan={[
          {
            man_id: "1",
            man_name: "Toyota",
            is_car: "1",
            is_spec: "0",
            is_moto: "0",
          },
        ]}
      />
    );

    // pick manufacturer
    await user.selectOptions(screen.getByLabelText("მწარმოებელი"), "1");
    // pick model
    await user.selectOptions(screen.getByLabelText("მოდელი"), "100");
    // pick category
    await user.selectOptions(screen.getByLabelText("კატეგორია"), "10");

    // switch currency
    await user.click(screen.getByRole("button", { name: "$" }));

    // price range
    await user.type(screen.getByPlaceholderText("დან"), "1000");
    await user.type(screen.getByPlaceholderText("მდე"), "2000");

    await user.click(screen.getByRole("button", { name: "ძებნა" }));

    expect(push).toHaveBeenCalledTimes(1);
    const url = push.mock.calls[0][0] as string;
    expect(url.startsWith("/?")).toBe(true);

    const params = new URLSearchParams(url.slice(2));
    expect(params.get("existing")).toBe("1");
    expect(params.get("manufacturer")).toBe("1");
    expect(params.get("model")).toBe("100");
    expect(params.get("category")).toBe("10");
    expect(params.get("currency")).toBe("USD");
    expect(params.get("priceFrom")).toBe("1000");
    expect(params.get("priceTo")).toBe("2000");
    expect(params.get("kind")).toBe("car");
    expect(params.get("dealType")).toBe("sell");
  });
});

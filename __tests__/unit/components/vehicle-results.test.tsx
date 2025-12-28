import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VehicleResults from "@/components/vehicle/vehicle-results";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  useSearchParams: () => ({
    toString: () => "",
  }),
}));

const useQueryMock = jest.fn();
jest.mock("@tanstack/react-query", () => ({
  useQuery: (args: any) => useQueryMock(args),
}));

describe("VehicleResults", () => {
  beforeEach(() => {
    push.mockClear();
    useQueryMock.mockReset();
  });

  test("shows skeleton while loading", () => {
    useQueryMock.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<VehicleResults allMan={[]} />);

    // skeleton renders 10 cards - assert at least one exists
    expect(document.querySelectorAll(".animate-pulse").length).toBeGreaterThan(
      0
    );
  });

  test("renders empty state and updates url when sort/period changes", async () => {
    const user = userEvent.setup();

    useQueryMock.mockReturnValue({
      data: { items: [], meta: { total: 0, last_page: 1 } },
      isLoading: false,
      isError: false,
    });

    render(<VehicleResults allMan={[]} />);

    expect(screen.getByText("0 განცხადება")).toBeInTheDocument();
    expect(screen.getByText("No vehicles found")).toBeInTheDocument();

    const selects = screen.getAllByRole("combobox");
    // [0] period, [1] sort
    await user.selectOptions(selects[0], "12h");
    expect(push).toHaveBeenCalledWith("/?period=12h");

    await user.selectOptions(selects[1], "3");
    expect(push).toHaveBeenCalledWith("/?sort=3");
  });

  test("paginates when results exist", async () => {
    const user = userEvent.setup();

    useQueryMock.mockImplementation(({ queryKey }: any) => {
      if (queryKey?.[0] === "models") {
        return {
          data: [{ model_id: 100, model_name: "Prius" }],
          isLoading: false,
          isError: false,
        };
      }
      return {
        data: {
          items: [
            {
              car_id: 1,
              prod_year: 2020,
              man_id: 1,
              car_model: "",
              engine_volume: 180,
              model_id: 100,
              price: 0,
              price_usd: 10000,
              price_value: 25000,
              photo: "x",
              photo_ver: 1,
              right_wheel: false,
              car_run_km: 123,
              order_date: "2025-01-01T00:00:00.000Z",
              views: 5,
              fuel_type_id: 7,
              is_payd: false,
              customs_passed: true,
              daily_views: { views: 0, product_id: 1, insert_Date: "" },
            },
          ],
          meta: { total: 1, last_page: 2 },
        },
        isLoading: false,
        isError: false,
      };
    });

    render(
      <VehicleResults
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

    expect(screen.getByText("1 განცხადება")).toBeInTheDocument();
    expect(screen.getByText("Page 1 / 2")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Page 2 / 2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Prev" })).not.toBeDisabled();
  });
});

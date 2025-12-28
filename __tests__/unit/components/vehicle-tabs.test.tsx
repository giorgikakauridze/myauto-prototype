import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VehicleTabs from "@/components/vehicle/vehicle-kind-tabs";

describe("VehicleTabs", () => {
  test("clicking a tab resets form with that kind", async () => {
    const user = userEvent.setup();
    const reset = jest.fn();

    render(
      <VehicleTabs
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        form={{ reset } as any}
        kind="car"
        defaultValues={{
          kind: "car",
          dealType: "sell",
          manufacturer: "",
          model: "",
          category: "",
          currency: "GEL",
          priceFrom: undefined,
          priceTo: undefined,
        }}
      />
    );

    await user.click(screen.getAllByRole("button")[1]); // tractor
    expect(reset).toHaveBeenCalledWith(
      expect.objectContaining({ kind: "tractor" })
    );
  });
});

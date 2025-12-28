import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CurrencyToggle } from "@/components/vehicle/filter-currency-toggle";

describe("CurrencyToggle", () => {
  test("toggles and calls onChange", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();

    render(<CurrencyToggle value="GEL" onChange={onChange} />);

    expect(screen.getByRole("button", { name: "₾" })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(screen.getByRole("button", { name: "$" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );

    await user.click(screen.getByRole("button", { name: "$" }));
    expect(onChange).toHaveBeenCalledWith("USD");
  });
});

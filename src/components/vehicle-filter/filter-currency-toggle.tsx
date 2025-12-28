import { cn } from "@/lib/helpers";
import { Currency } from "../../../types/types";

export function CurrencyToggle({
  value,
  onChange,
}: {
  value: Currency;
  onChange: (v: Currency) => void;
}) {
  return (
    <div className="inline-flex overflow-hidden rounded-full border border-[#D8DBE6] bg-white">
      <button
        type="button"
        onClick={() => onChange("GEL")}
        className={cn(
          "h-8 w-8 grid place-items-center rounded-full   transition",
          value === "GEL" ? "bg-[#1F2230] text-white" : "text-[#7B8094]"
        )}
        aria-pressed={value === "GEL"}
      >
        ₾
      </button>
      <button
        type="button"
        onClick={() => onChange("USD")}
        className={cn(
          "h-8 w-8 grid place-items-center rounded-full   transition",
          value === "USD" ? "bg-[#1F2230] text-white" : "text-[#7B8094]"
        )}
        aria-pressed={value === "USD"}
      >
        $
      </button>
    </div>
  );
}

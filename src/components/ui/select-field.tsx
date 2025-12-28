import type { UseFormRegisterReturn } from "react-hook-form";
import { VehicleFilterValues } from "../../../types/types";
import { cn } from "@/lib/helpers";
import { ChevronDownIcon } from "@/icons/chevron-down-icon";

export function SelectField({
  label,
  placeholder,
  registration,
  options,
  classNames,
  disabled,
  name,
  value,
  defaultValue,
  onChange,
}: {
  disabled?: boolean;
  label?: string;
  classNames?: string;
  placeholder?: string;
  registration?: UseFormRegisterReturn<keyof VehicleFilterValues & string>;
  options: Array<{ value: string; label: string }>;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <label className="block">
      {label && <div className="text-sm  text-[#6F7383]">{label}</div>}
      <div className="mt-2">
        <div className="relative">
          <select
            disabled={disabled}
            name={registration?.name ?? name}
            ref={registration?.ref}
            value={value}
            defaultValue={defaultValue}
            onBlur={registration?.onBlur}
            onChange={(e) => {
              registration?.onChange(e);
              onChange?.(e);
            }}
            className={cn(
              "w-full appearance-none rounded-[11px] border border-[#C2C9D8] bg-white px-4 py-3 text-sm  outline-none",
              "focus:border-primary focus:ring-2 focus:ring-primary/15",
              "text-[#6F7383]",
              classNames
            )}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#C2C9D8]">
            <ChevronDownIcon />
          </div>
        </div>
      </div>
    </label>
  );
}

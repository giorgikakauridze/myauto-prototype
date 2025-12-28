import { CarIcon } from "@/icons/car-icon";
import { TractorIcon } from "@/icons/tractor-icon";
import { MotoIcon } from "@/icons/moto-icon";
import {
  VehicleFilterValues,
  VehicleKind,
  VehicleKindItem,
} from "../../../types/types";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/helpers";

const KINDS: VehicleKindItem[] = [
  {
    value: "car",
    label: "ავტომობილი",
    icon: <CarIcon fill="currentColor" />,
  },
  {
    value: "tractor",
    label: "სპეც-ტექნიკა",
    icon: <TractorIcon fill="currentColor" />,
  },
  {
    value: "moto",
    label: "მოტო",
    icon: <MotoIcon fill="currentColor" />,
  },
];

export const VehicleTabs = ({
  form,
  kind,
  defaultValues,
}: {
  form: UseFormReturn<VehicleFilterValues>;
  kind: VehicleKind;
  defaultValues: VehicleFilterValues;
}) => {
  return (
    <div className="grid grid-cols-3 border-b border-[#E4E6EF] bg-[#FBFBFD]">
      {KINDS.map((k) => {
        const active = kind === k.value;
        return (
          <button
            key={k.value}
            type="button"
            onClick={() => form.reset({ ...defaultValues, kind: k.value })}
            className={cn(
              "relative h-[48px] grid place-items-center  text-[#B7BBCB] transition",
              "border-r border-[#E4E6EF] last:border-r-0",
              active && "bg-white text-orange-600" //#FD4100
            )}
            aria-pressed={active}
          >
            {k.icon}
            {active && (
              <span className="absolute inset-x-0 bottom-0 h-[3px] bg-primary" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default VehicleTabs;

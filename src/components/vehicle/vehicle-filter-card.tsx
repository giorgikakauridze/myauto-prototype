"use client";

import { getCategories, getModelsByManId } from "@/lib/car/api";
import { cn, filterCategoryByKind, filterMansByKind } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import type { Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";
import { ManTypeResponse, VehicleFilterValues } from "../../../types/types";
import { SelectField } from "../ui/select-field";
import { CurrencyToggle } from "./filter-currency-toggle";
import VehicleTabs from "./vehicle-kind-tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleFilterSchema } from "@/lib/validation/vehicle-filter";

const DEFAULT_VALUES: VehicleFilterValues = {
  kind: "car",
  dealType: "sell",
  manufacturer: "",
  model: "",
  category: "",
  currency: "GEL",
  priceFrom: undefined,
  priceTo: undefined,
};

export default function VehicleFilterCard({
  allMan,
  initialValues,
  onModalClose,
}: {
  onModalClose?: () => void;
  allMan: ManTypeResponse[];
  initialValues?: Partial<VehicleFilterValues>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isModal = onModalClose !== undefined;

  const form = useForm<VehicleFilterValues>({
    defaultValues: { ...DEFAULT_VALUES, ...initialValues },
    mode: "onChange",
    resolver: zodResolver(vehicleFilterSchema) as Resolver<VehicleFilterValues>,
  });

  const manufacturerId = form.watch("manufacturer")?.toString() ?? null;
  const kind = form.watch("kind");
  const currency = form.watch("currency");

  const { data: allCategories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const { data: allModels, isLoading: isModelsLoading } = useQuery({
    queryKey: ["models", manufacturerId],
    queryFn: () => getModelsByManId(manufacturerId),
    enabled: !!manufacturerId,
  });

  const mansByKind = filterMansByKind(kind, allMan);
  const categoriesByKind = filterCategoryByKind(kind, allCategories ?? []);

  const onSubmit = async (values: VehicleFilterValues) => {
    try {
      if (onModalClose) {
        onModalClose();
      }

      const params = new URLSearchParams(searchParams.toString());

      Object.entries(values).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.push(`/?${params.toString()}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      className={`w-full  ${
        !isModal ? "max-w-[250px] hidden md:block" : "md:hidden"
      }`}
    >
      <div className="rounded-[11px] border border-[#E4E6EF] bg-white shadow-[0_18px_55px_rgba(19,20,33,0.10)] overflow-hidden">
        <VehicleTabs form={form} kind={kind} defaultValues={DEFAULT_VALUES} />

        <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 pt-8 pb-7">
          <div className="space-y-4">
            <SelectField
              label="გარიგების ტიპი"
              registration={form.register("dealType")}
              options={[
                { value: "sell", label: "იყიდება" },
                { value: "rent", label: "ქირავდება" },
              ]}
            />

            <SelectField
              label="მწარმოებელი"
              placeholder="ყველა მწარმოებელი"
              registration={form.register("manufacturer")}
              onChange={() => {
                form.setValue("model", "");
              }}
              options={mansByKind.map((man) => ({
                value: man.man_id,
                label: man.man_name,
              }))}
            />

            <SelectField
              label="მოდელი"
              disabled={
                form.watch("manufacturer") === "" ||
                !form.watch("manufacturer") ||
                isModelsLoading
              }
              placeholder="ყველა მოდელი"
              registration={form.register("model")}
              options={(allModels ?? []).map((cat) => ({
                value: cat.model_id.toString(),
                label: cat.model_name,
              }))}
            />

            <SelectField
              label="კატეგორია"
              disabled={isCategoriesLoading}
              placeholder="ყველა კატეგორია"
              registration={form.register("category")}
              options={categoriesByKind.map((cat) => ({
                value: cat.category_id.toString(),
                label: cat.title,
              }))}
            />

            <div className="pt-4 border-t border-[#ECEEF6]">
              <div className="flex mb-5 items-center justify-between">
                <div className="text-base  text-[#2C2E35]">ფასი</div>
                <CurrencyToggle
                  value={currency}
                  onChange={(v) => form.setValue("currency", v)}
                />
              </div>

              <div className="mt-5 flex items-center gap-1.5">
                <input
                  inputMode="numeric"
                  placeholder="დან"
                  type="number"
                  className={cn(
                    "w-full rounded-[11px] border border-[#D8DBE2] bg-white px-4 py-3 text-sm  outline-none",
                    "focus:border-primary focus:ring-2 focus:ring-primary/15"
                  )}
                  {...form.register("priceFrom")}
                />

                <div className="text-[#6F7383] text-sm font-semibold select-none">
                  –
                </div>

                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="მდე"
                  className={cn(
                    "w-full  rounded-[11px] border border-[#D8DBE2] bg-white px-4 py-3 text-sm  outline-none",
                    "focus:border-primary focus:ring-2 focus:ring-primary/15"
                  )}
                  {...form.register("priceTo")}
                />
              </div>
              {(form.formState.errors.priceFrom ||
                form.formState.errors.priceTo) && (
                <div className="mt-2 text-xs text-red-600">
                  {form.formState.errors.priceFrom?.message ||
                    form.formState.errors.priceTo?.message}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="mt-10 h-[32px] w-full rounded-md bg-primary text-white text-base  shadow-[0_14px_30px_rgba(253,65,0,0.25)] active:translate-y-[1px] transition"
          >
            ძებნა
          </button>
        </form>
      </div>
    </div>
  );
}

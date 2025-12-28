"use client";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../ui/card";
import { SelectField } from "../ui/select-field";
import { getVehicles } from "@/lib/car/api";
import SkeletonVehicleCards from "../ui/skeleton-card";
import { useMemo, useState } from "react";
import { ManTypeResponse } from "../../../types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { parseFilters } from "@/lib/helpers";
import VehicleFilterCard from "./vehicle-filter-card";
import { Modal } from "../ui/modal";
import { FilterIcon } from "@/icons/filter-icon";
import { periodConfig, sortConfig } from "@/lib/config/filter-config";

const VehicleResults = ({ allMan }: { allMan: ManTypeResponse[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const spString = searchParams.toString();
  const filters = useMemo(
    () => parseFilters(new URLSearchParams(spString)),
    [spString]
  );
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const {
    data: vehicles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["vehicles", spString, page],
    queryFn: () => getVehicles({ filters, page }),
    staleTime: 1000 * 60 * 30, // 30 minutes for stale time , has to be updated frequently
  });

  if (isError) throw new Error("Failed to fetch vehicles");

  const LAST_PAGE = useMemo(
    () => vehicles?.meta?.last_page ?? 1,
    [vehicles?.meta?.last_page]
  );

  function sortChangeHandler(key: "sort" | "period", v: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (!v) next.delete(key);
    else next.set(key, v);
    setPage(1);
    router.push(`/?${next.toString()}`);
  }

  return (
    <div className="w-full">
      <div className="md:hidden mb-4">
        <button
          onClick={() => setOpen(true)}
          className="h-10 px-4 border-black border rounded-lg bg-white  flex items-center gap-2"
        >
          <FilterIcon />
          <span className="text-sm">ფილტრი</span>
        </button>

        <Modal open={open} onClose={() => setOpen(false)} title="ფილტრები">
          <VehicleFilterCard
            allMan={allMan}
            onModalClose={() => setOpen(false)}
          />
        </Modal>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex md:flex-row flex-col  md:justify-between   md:items-center">
          <div className="text-lg ">{vehicles?.meta?.total} განცხადება</div>
          <div className="flex gap-2">
            <SelectField
              classNames="border-none shadow-none mr-4 md:mr-8"
              options={periodConfig}
              value={filters.Period ?? ""}
              placeholder="პერიოდი"
              onChange={(e) => sortChangeHandler("period", e.target.value)}
            />
            <SelectField
              classNames="border-none shadow-none mr-4 md:mr-8"
              placeholder="სორტირება"
              options={sortConfig}
              value={filters.SortOrder ?? ""}
              onChange={(e) => sortChangeHandler("sort", e.target.value)}
            />
          </div>
        </div>
        {isLoading ? (
          <SkeletonVehicleCards />
        ) : (
          vehicles?.items.map((car) => (
            <Card
              key={car.car_id}
              currency={filters.CurrencyID as "1" | "3"}
              car={car}
              allMan={allMan}
            />
          ))
        )}

        {vehicles?.items && vehicles?.items.length > 0 ? (
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              className="px-3 py-2 rounded-md border disabled:opacity-40"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setPage((p) => Math.max(1, p - 1));
              }}
              disabled={page <= 1 || isLoading}
            >
              Prev
            </button>

            <span className="px-3 py-2 text-sm opacity-70">
              Page {page} / {LAST_PAGE}
            </span>

            <button
              className="px-3 py-2 rounded-md border disabled:opacity-40"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setPage((p) => Math.min(LAST_PAGE, p + 1));
              }}
              disabled={page >= LAST_PAGE || isLoading}
            >
              Next
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="px-3 py-2 text-sm opacity-70">
              {isLoading ? "" : "No vehicles found"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleResults;

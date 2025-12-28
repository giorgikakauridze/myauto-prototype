import BreadCrumps from "@/components/breadcrump";
import SkeletonVehicleCards from "@/components/ui/skeleton-card";
import VehicleFilterCard from "@/components/vehicle/vehicle-filter-card";
import ContainerWrapper from "@/components/wrapper/container";
import { getManufacturers } from "@/lib/car/api";
import dynamic from "next/dynamic";

const VehicleResults = dynamic(
  () => import("@/components/vehicle/vehicle-results"),
  {
    loading: () => <SkeletonVehicleCards />,
  }
);

// We can make it ISR - car manucafturers does not change frequently(if at all)
export const revalidate = 3600;

export default async function Page() {
  const allMan = await getManufacturers();

  return (
    <ContainerWrapper>
      <div className="py-10">
        <BreadCrumps />
        <div className="mt-8 flex gap-4">
          <VehicleFilterCard allMan={allMan} />

          <VehicleResults allMan={allMan} />
        </div>
      </div>
    </ContainerWrapper>
  );
}

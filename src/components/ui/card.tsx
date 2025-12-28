import { AutomaticIcon } from "@/icons/automatic-icon";
import { EditIcon } from "@/icons/edit-icon";
import { EngineIcon } from "@/icons/engine";
import { FavoriteIcon } from "@/icons/Favorite-icon";
import { SacheIcon } from "@/icons/sache";
import { ShedarebaIcon } from "@/icons/shedareba-icon";
import { SpeedIcon } from "@/icons/speed-icon";
import Image from "next/image";
import { ManTypeResponse, VehicleResponse } from "../../../types/types";
import { useQuery } from "@tanstack/react-query";
import { getModelsByManId } from "@/lib/car/api";
import { getDaysDifference, getFuelType, shimmer } from "@/lib/helpers";

export function Card({
  car,
  allMan,
  currency,
}: {
  car: VehicleResponse["items"][number];
  allMan: ManTypeResponse[];
  currency: "1" | "3";
}) {
  const price = currency === "1" ? car.price_value : car.price_usd;
  const manufacturer = allMan.find(
    (m) => m.man_id.toString() === car.man_id.toString()
  );

  const { data: allModels } = useQuery({
    queryKey: ["models", manufacturer?.man_id],
    queryFn: () => getModelsByManId(manufacturer?.man_id?.toString()),
    enabled: !!manufacturer?.man_id,
  });

  /// TODO FIX
  const carName =
    (manufacturer?.man_name ?? "") +
    " " +
    (allModels?.find((m) => m.model_id.toString() === car.model_id.toString())
      ?.model_name ?? "") +
    (car.car_model?.length > 0 ? " " + car.car_model : "");

  return (
    <div className="bg-white rounded-xl flex gap-4 shadow-sm p-4 flex-col md:flex-row">
      <div className="min-w-[178px] min-h-[256px] md:min-h-[140px] relative overflow-hidden rounded-xl">
        <Image
          src={`https://static.my.ge/myauto/photos/${car.photo}/thumbs/${car.car_id}_1.jpg?v=${car.photo_ver}`}
          alt="Car"
          fill
          blurDataURL={shimmer(178, 140)}
          objectFit="cover"
        />
      </div>

      <CarSpecs
        fuel_type_id={car.fuel_type_id}
        customs_passed={car.customs_passed}
        car_order_date={car.order_date}
        carName={carName}
        currency={currency}
        views={car.views}
        year={car.prod_year}
        price={price}
        isVip={car.is_payd}
        milleage={car.car_run_km}
        engine={car.engine_volume}
        wheel={car.right_wheel ? "მარჯვენა" : "მარცხენა"}
      />
    </div>
  );
}

function CarSpecs({
  fuel_type_id,
  customs_passed,
  views,
  currency,
  isVip,
  car_order_date,
  milleage,
  wheel,
  carName,
  price,
  engine,
  year,
}: {
  isVip?: boolean;
  fuel_type_id?: number;
  customs_passed?: boolean;
  currency: "1" | "3";
  car_order_date?: string;
  views?: number;
  year?: number;
  milleage?: number;
  engine?: number;
  wheel?: string;
  carName?: string;
  price?: number;
}) {
  const daysAgo = getDaysDifference(car_order_date);
  const fuelType = getFuelType(fuel_type_id);

  return (
    <div className="w-full">
      {/* header */}
      <div className="flex gap-2  justify-between w-full">
        <div className="space-x-2 text-sm md:text-base flex">
          <div>{carName ?? ""}</div>
          <div className="text-[#8C929B] min-w-[55px]">{year} წ</div>
        </div>
        <div className="flex md:flex-row flex-col text-xs gap-4">
          <div
            className={`${
              customs_passed ? "text-[#26B753]" : "text-[#FF3B30]"
            }`}
          >
            {customs_passed ? "განბაჯებული" : "განუბაჯებელი"}
          </div>
          <div className="text-[#8C929B]">თბილისი</div>
        </div>
      </div>
      {/* body */}
      <div className="flex justify-between  py-6 w-full">
        <div className="grid text-sm grid-cols-2 gap-y-4 gap-x-10 lg:gap-x-24">
          <div className="flex items-center gap-2">
            <EngineIcon />
            <span>
              {engine ? (engine / 100).toString().split("").join(".") : 0}{" "}
              {fuelType}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <SpeedIcon />
            <span>{milleage ?? 0} კმ</span>
          </div>{" "}
          <div className="flex items-center gap-2">
            <AutomaticIcon />
            <span>ავტომატიკა</span>
          </div>{" "}
          <div className="flex items-center gap-2">
            <SacheIcon />
            <span>{wheel}</span>
          </div>
        </div>
        <div className="text-2xl flex items-center  gap-1">
          <span>{Math.floor(price ?? 0)?.toLocaleString()}</span>
          <span className="text-sm  bg-[#f2f3f6] rounded-full px-2 py-1">
            {currency === "1" ? "₾" : "$"}
          </span>
        </div>
      </div>

      {/* footer */}
      <div className="flex text-xs justify-between w-full">
        <div className="text-[#8C929B] flex items-center gap-1">
          {isVip ? (
            <span className="bg-primary text-white px-4 text-xs py-1 rounded-full">
              VIP
            </span>
          ) : null}
          <span>{views} ნახვა</span>
          <span className="bg-[#8C929B] w-1 h-1 rounded-full " />
          <span>{daysAgo} დღის წინ</span>
        </div>
        <div className="text-[#8C929B] flex items-center gap-4">
          <EditIcon />
          <ShedarebaIcon />
          <FavoriteIcon />
        </div>
      </div>
    </div>
  );
}

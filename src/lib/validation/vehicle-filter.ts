import { z } from "zod";

const numberFromInput = z.preprocess((v) => {
  if (v === "" || v === null || v === undefined) return undefined;
  if (typeof v === "number") return Number.isNaN(v) ? undefined : v;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isNaN(n) ? undefined : n;
  }
  return undefined;
}, z.number().nonnegative().optional());

export const vehicleFilterSchema = z
  .object({
    kind: z.enum(["car", "tractor", "moto"]),
    dealType: z.enum(["sell", "rent"]),
    manufacturer: z.string(),
    model: z.string(),
    category: z.string(),
    currency: z.enum(["GEL", "USD"]),
    priceFrom: numberFromInput,
    priceTo: numberFromInput,
  })
  .superRefine((values, ctx) => {
    const { priceFrom, priceTo } = values;
    if (
      priceFrom !== undefined &&
      priceTo !== undefined &&
      priceFrom >= priceTo
    ) {
      ctx.addIssue({
        code: "custom",
        message: "საწყისი ფასი უნდა იყოს მაქსიმალურ ფასზე ნაკლები",
        path: ["priceTo"],
      });
    }
  });

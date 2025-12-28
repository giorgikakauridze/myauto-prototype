import "@testing-library/jest-dom";
import React from "react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, ...rest } = props;
    const resolvedSrc = typeof src === "string" ? src : (src?.src ?? "");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
      fill,
      blurDataURL,
      objectFit,
      placeholder,
      loader,
      quality,
      ...img
    } = rest;
    return React.createElement("img", { src: resolvedSrc, alt, ...img });
  },
}));

// Used by `VehicleResults` pagination buttons in jsdom.
Object.defineProperty(window, "scrollTo", {
  value: () => {},
  writable: true,
});

"use client";

import { useState } from "react";
import { LeftArrow } from "./LeftArrow";
import { RightArrow } from "./RightArrow";

export function MonthPickerCarousel() {
  const [carouselIdx, setCarouselIdx] = useState(0);

  const canGoLeft = carouselIdx >= 1;
  const canGoRight = carouselIdx < 1;

  const handleChangeCarouselIdx =
    (up = false) =>
    () => {
      if (up) {
        if (canGoRight) {
          setCarouselIdx((prev) => prev + 1);
        }
        return;
      }
      if (canGoLeft) setCarouselIdx((prev) => prev - 1);
    };
  return (
    <div className="w-56 mx-auto flex justify-center">
      <button
        className={`btn btn-xs btn-circle btn-ghost h-5 w-6 ${
          canGoLeft ? "" : "btn-disabled  opacity-40"
        }`}
        onClick={handleChangeCarouselIdx()}
      >
        <LeftArrow />
      </button>
      <div className="w-full overflow-hidden flex flex-col justify-center ">
        <div
          className="whitespace-nowrap trans"
          style={{
            transform: `translate(-${carouselIdx * 100}%)`,
            transition: "transform 0.3s",
          }}
        >
          <div id="slide1" className="w-full inline-flex justify-center">
            <p className="h3 text-lg font-semibold">January 2024</p>
          </div>
          <div id="slide2" className="w-full inline-flex justify-center">
            <p className="h3 text-lg font-semibold">February 2024</p>
          </div>
        </div>
      </div>
      <button
        className={`btn btn-xs btn-circle btn-ghost h-5 w-6 ${
          canGoRight ? "" : "btn-disabled  opacity-40"
        }`}
        onClick={handleChangeCarouselIdx(true)}
      >
        <RightArrow />
      </button>
    </div>
  );
}

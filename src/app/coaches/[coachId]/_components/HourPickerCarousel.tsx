"use client";

import { useState } from "react";
import { LeftArrow } from "./LeftArrow";
import { RightArrow } from "./RightArrow";

const DUMMY_DATA = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export function HourPickerCarousel() {
  const [carouselIdx, setCarouselIdx] = useState(0);

  const canGoLeft = carouselIdx >= 1;
  const canGoRight = carouselIdx < 4;

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
    <div className="w-full flex justify-center items-center">
      <button
        className={`btn btn-xs btn-circle btn-ghost h-5 w-6 mr-3 ${
          canGoLeft ? "" : "btn-disabled opacity-40"
        }`}
        onClick={handleChangeCarouselIdx()}
      >
        <LeftArrow />
      </button>
      <div className="w-full overflow-hidden flex flex-col justify-center">
        <div
          className="whitespace-nowrap flex gap-3"
          style={{
            transform: `translate(-${carouselIdx * 100}%)`,
            transition: "transform 0.3s",
          }}
        >
          {DUMMY_DATA.map((hour) => (
            <div key={hour} className="inline-flex">
              <button className="btn btn-outline rounded-sm h-auto w-32">
                <div className="py-2">
                  <p className="">{hour}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        className={`btn btn-xs btn-circle btn-ghost h-5 w-6 ml-3 ${
          canGoRight ? "" : "btn-disabled  opacity-40"
        }`}
        onClick={handleChangeCarouselIdx(true)}
      >
        <RightArrow />
      </button>
    </div>
  );
}

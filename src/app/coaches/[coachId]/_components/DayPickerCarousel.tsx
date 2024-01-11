"use client";

import { useState } from "react";
import { LeftArrow } from "./LeftArrow";
import { RightArrow } from "./RightArrow";

const DUMMY_DATA = [
  {
    day: 1,
    name: "Czwartek",
  },
  {
    day: 2,
    name: "Monday",
  },
  {
    day: 3,
    name: "Tuesday",
  },
  {
    day: 4,
    name: "Wednesday",
  },
  {
    day: 5,
    name: "Thursday",
  },
  {
    day: 6,
    name: "Friday",
  },
  {
    day: 7,
    name: "Saturday",
  },
  {
    day: 8,
    name: "Poniedziałek",
  },
  {
    day: 9,
    name: "wd",
  },
];

export function DayPickerCarousel() {
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
          {DUMMY_DATA.map((day) => (
            <div key={day.day} className="inline-flex">
              <button className="btn btn-outline rounded-sm h-auto w-28">
                <div className="py-5">
                  <p className="mb-2">{day.name}</p>
                  <p className="text-sm font-normal">{day.day}.01</p>
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

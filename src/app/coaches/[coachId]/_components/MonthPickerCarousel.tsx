"use client";

import { LeftArrow } from "./LeftArrow";
import { RightArrow } from "./RightArrow";
import { format } from "date-fns";

export function MonthPickerCarousel({
  activeMonth,
  months,
  setMonth,
}: {
  months: string[];
  activeMonth: string;
  setMonth: (newMonth: string) => void;
}) {
  const carouselIdx = months.indexOf(activeMonth);

  const canGoLeft = carouselIdx > 0;
  const canGoRight = carouselIdx < months.length - 1;

  const handleChangeCarouselIdx =
    (up = false) =>
    () => {
      if (up) {
        if (canGoRight) {
          const newMonth = months[carouselIdx + 1];
          setMonth(newMonth);
        }
        return;
      }
      if (canGoLeft) {
        const newMonth = months[carouselIdx - 1];
        setMonth(newMonth);
      }
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
          {months.map((month) => (
            <div key={month} className="w-full inline-flex justify-center">
              <p className="h3 text-lg font-semibold">
                {format(
                  new Date(
                    Number(month.split("-")[1]),
                    Number(month.split("-")[0]),
                  ),
                  "MMMM yyyy",
                )}
              </p>
            </div>
          ))}
          {/* <div id="slide1" className="w-full inline-flex justify-center">
            <p className="h3 text-lg font-semibold">January 2024</p>
          </div>
          <div id="slide2" className="w-full inline-flex justify-center">
            <p className="h3 text-lg font-semibold">February 2024</p>
          </div> */}
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

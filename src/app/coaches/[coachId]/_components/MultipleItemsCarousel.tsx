"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LeftArrow } from "./LeftArrow";
import { RightArrow } from "./RightArrow";
import { format } from "date-fns";

export function MultipleItemsCarousel({
  itemRender,
}: {
  itemRender: () => JSX.Element;
}) {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [canGoRight, setCanGoRight] = useState(
    scrollableRef.current &&
      scrollableRef.current.scrollWidth > scrollableRef.current.clientWidth,
  );
  const [canGoLeft, setCanGoLeft] = useState(carouselIdx >= 1);

  useLayoutEffect(() => {
    setCanGoRight(
      scrollableRef.current &&
        scrollableRef.current.scrollWidth > scrollableRef.current.clientWidth,
    );
  }, []);

  const handleChangeCarouselIdx =
    (up = false) =>
    () => {
      if (up) {
        if (canGoRight) {
          setCarouselIdx((prev) => prev + 1);
          setCanGoRight(false);
        }
        return;
      }
      if (canGoLeft) {
        setCarouselIdx((prev) => prev - 1);
        setCanGoLeft(false);
      }
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
      <div
        ref={scrollableRef}
        className="w-full overflow-hidden flex flex-col justify-center"
      >
        <div
          onTransitionEnd={() => {
            setCanGoRight(
              scrollableRef.current &&
                scrollableRef.current.scrollWidth >
                  scrollableRef.current.clientWidth,
            );
            setCanGoLeft(carouselIdx >= 1);
          }}
          className="whitespace-nowrap flex gap-3"
          style={{
            transform: `translate(-${carouselIdx * 100}%)`,
            transition: "transform 0.3s",
          }}
        >
          {itemRender()}
          {/* {days.map((day) => itemRender(day))} */}
          {/* {days.map((day) => (
            <div key={day} className="inline-flex">
              <button
                className={`btn btn-outline rounded-sm h-auto w-28 ${
                  activeDay === day ? "btn-active" : ""
                }`}
                onClick={() => setDay(day)}
              >
                <div className="py-5">
                  <p className="mb-2">{format(getDateByDay(day), "EEEE")}</p>
                  <p className="text-sm font-normal">
                    {format(getDateByDay(day), "dd.MM")}
                  </p>
                </div>
              </button>
            </div>
          ))} */}
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

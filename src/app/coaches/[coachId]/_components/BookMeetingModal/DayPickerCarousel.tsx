import { format } from "date-fns";
import { MultipleItemsCarousel } from "./MultipleItemsCarousel";

export function DayPickerCarousel({
  activeDay,
  days,
  setDay,
  activeMonth,
}: {
  days: number[];
  activeDay: number | null;
  activeMonth: string;
  setDay: (newDay: number) => void;
}) {
  const getDateByDay = (day: number) => {
    return new Date(
      Number(activeMonth.split("-")[1]),
      Number(activeMonth.split("-")[0]),
      day,
    );
  };

  return (
    <MultipleItemsCarousel
      itemRender={() => (
        <>
          {days.map((day) => (
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
          ))}
        </>
      )}
    />
  );
}

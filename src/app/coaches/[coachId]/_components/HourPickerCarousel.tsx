import { format } from "date-fns";
import { MultipleItemsCarousel } from "./MultipleItemsCarousel";

export function HourPickerCarousel({
  activeHour,
  activeDay,
  activeMonth,
  hours,
  setHour,
}: {
  hours: string[];
  activeHour: string | null;
  activeMonth: string;
  activeDay: number;
  setHour: (newHour: string) => void;
}) {
  const getDateByHour = (hour: string) => {
    return new Date(
      Number(activeMonth.split("-")[1]),
      Number(activeMonth.split("-")[0]),
      activeDay,
      Number(hour.split(":")[0]),
      Number(hour.split(":")[1]),
    );
  };

  return (
    <MultipleItemsCarousel
      itemRender={() => (
        <>
          {hours.map((hour) => (
            <div key={hour} className="inline-flex">
              <button
                className={`btn btn-outline rounded-sm h-auto w-32 ${
                  activeHour === hour ? "btn-active" : ""
                }`}
                onClick={() => setHour(hour)}
              >
                <div className="py-2">
                  <p className="">{format(getDateByHour(hour), "HH:mm")}</p>
                </div>
              </button>
            </div>
          ))}
        </>
      )}
    />
  );
}

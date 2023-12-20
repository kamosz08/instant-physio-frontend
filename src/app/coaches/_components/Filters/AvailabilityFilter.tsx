"use client";
import "react-calendar/dist/Calendar.css";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";

import { calculateSearchQuery } from "@/utils/calculateSearchQuery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Calendar from "react-calendar";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import { format, isAfter, setHours, setMinutes } from "date-fns";

type DateValuePiece = Date | null;
type DateValue = DateValuePiece | [DateValuePiece, DateValuePiece];

type TimeValuePiece = Date | string | null;
type TimeValue = TimeValuePiece | [TimeValuePiece, TimeValuePiece];

const calculateDateFrom = (
  dateValue: DateValuePiece,
  timeValue: TimeValuePiece,
) => {
  if (!dateValue || typeof timeValue !== "string") {
    return null;
  }
  const hourFrom = Number(timeValue.split(":")[0]);
  const minFrom = Number(timeValue.split(":")[1]);
  let dateFrom = setHours(dateValue, hourFrom);
  dateFrom = setMinutes(dateFrom, minFrom);
  return dateFrom;
};

export function AvailabilityFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const availableFrom = searchParams.get("available[from]");
  const availableTo = searchParams.get("available[to]");

  const [dateValue, onDateChange] = useState<DateValue>(
    availableFrom ? new Date(availableFrom) : new Date(),
  );
  const [timeValue, onTimeChange] = useState<TimeValue>([
    availableFrom ? format(new Date(availableFrom), "HH:mm") : "8:00",
    availableTo ? format(new Date(availableTo), "HH:mm") : "16:00",
  ]);

  const dateFrom = calculateDateFrom(
    !Array.isArray(dateValue) ? dateValue : null,
    Array.isArray(timeValue) ? timeValue[0] : null,
  );
  const dateTo = calculateDateFrom(
    !Array.isArray(dateValue) ? dateValue : null,
    Array.isArray(timeValue) ? timeValue[1] : null,
  );

  const canApply = dateFrom && dateTo && isAfter(dateTo, dateFrom);

  const applyFilter = () => {
    if (!canApply) return;

    const newSearchQuery = calculateSearchQuery(searchParams.toString(), {
      key: "available",
      value: { from: dateFrom.toISOString(), to: dateTo.toISOString() },
    });

    router.push(`${pathname}?${newSearchQuery}`);
  };

  const clearFilter = () => {
    const newSearchQuery = calculateSearchQuery(searchParams.toString(), {
      key: "available",
      value: { from: "", to: "" },
    });

    router.push(`${pathname}?${newSearchQuery}`);
  };

  return (
    <div className="availability">
      <p className="text-lg font-semibold mb-4">Availability</p>

      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">
          Select time
        </div>
        <div
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80"
        >
          <Calendar
            onChange={onDateChange}
            value={dateValue}
            locale="en"
            minDate={new Date()}
            minDetail="month"
            next2Label={null}
            prev2Label={null}
          />
          <TimeRangePicker
            onChange={onTimeChange}
            value={timeValue}
            locale="en"
            format="HH:mm"
            disableClock
            clearIcon={null}
          />
          <div className="flex justify-between mt-1">
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => clearFilter()}
            >
              Clear
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => applyFilter()}
              disabled={!canApply}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

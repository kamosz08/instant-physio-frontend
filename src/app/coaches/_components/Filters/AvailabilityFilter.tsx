"use client";
import "react-calendar/dist/Calendar.css";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "./overrideDateAndTimePicker.css";

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

const formatChosenDate = (dateFrom: Date, dateTo: Date) => {
  const date = format(dateFrom, "yyyy-MM-dd");
  const timeFrom = format(dateFrom, "HH:mm");
  const timeto = format(dateTo, "HH:mm");

  // return `${date} ${timeFrom} - ${timeto}`;
  return (
    <div className="text-center">
      <p className="text-xs font-medium">{date}</p>
      <p className="">
        {timeFrom} - {timeto}
      </p>
    </div>
  );
};

export function AvailabilityFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  const availableFrom = searchParams.get("available[from]");
  const availableTo = searchParams.get("available[to]");
  const isApplied = availableFrom && availableTo;

  const [dateValue, onDateChange] = useState<DateValue>(
    availableFrom ? new Date(availableFrom) : new Date(),
  );
  const [timeValue, onTimeChange] = useState<TimeValue>([
    availableFrom ? format(new Date(availableFrom), "HH:mm") : "08:00",
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
    setIsOpen(false);
    router.push(`${pathname}?${newSearchQuery}`);
  };

  const clearFilter = () => {
    const newSearchQuery = calculateSearchQuery(searchParams.toString(), {
      key: "available",
      value: { from: "", to: "" },
    });
    setIsOpen(false);
    router.push(`${pathname}?${newSearchQuery}`);
  };

  return (
    <div className="availability">
      <p className="text-lg font-semibold mb-4">Availability</p>

      <div className={`dropdown ${isOpen ? "dropdown-open" : ""}`}>
        <div
          tabIndex={0}
          role="button"
          className="select select-bordered mt-1"
          onFocus={() => setIsOpen(true)}
        >
          <div className="flex justify-center items-center">
            {isApplied
              ? formatChosenDate(new Date(availableFrom), new Date(availableTo))
              : "Select time"}
          </div>
        </div>
        <div
          tabIndex={0}
          className={`${
            isOpen ? "" : "hidden"
          } dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80`}
        >
          <button
            className="btn btn-square btn-sm ml-auto my-2"
            onClick={() => setIsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <Calendar
            onChange={onDateChange}
            value={dateValue}
            locale="en"
            minDate={new Date()}
            minDetail="month"
            next2Label={null}
            prev2Label={null}
          />
          <div className="flex justify-center mt-2">
            <div className="relative">
              <div className="labels absolute left-0 top-[3px]">
                <p className="text-xs text-gray-500">from:</p>
                <p className="text-xs text-gray-500 absolute left-[112px] top-0">
                  to:
                </p>
              </div>
              <TimeRangePicker
                onChange={onTimeChange}
                value={timeValue}
                locale="en"
                format="HH:mm"
                disableClock
                clearIcon={null}
              />
            </div>
          </div>
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

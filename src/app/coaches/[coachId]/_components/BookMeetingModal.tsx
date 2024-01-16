"use client";

import { useEffect, useRef, useState } from "react";
import { DayPickerCarousel } from "./DayPickerCarousel";
import { MonthPickerCarousel } from "./MonthPickerCarousel";
import { HourPickerCarousel } from "./HourPickerCarousel";
import { useAvailableDates } from "./useAvailableDates";
import { bookMeetingAction } from "@/domain-logic/authUser/bookMeeting";
import { backendApi } from "@/backendApi";
import { addHours } from "date-fns";

export function BookMeetingModal({ coachId }: { coachId: number }) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [pickedDate, setPickedDate] = useState<{
    month: string | null;
    day: number | null;
    hour: string | null;
  }>({ month: null, day: null, hour: null });
  const { months, days, hours, fetchData } = useAvailableDates(coachId);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    if (months) {
      setPickedDate({ month: Array.from(months)[0], day: null, hour: null });
    }
  }, [months]);

  const isDatePicked =
    pickedDate.month && typeof pickedDate.day === "number" && pickedDate.hour;

  const setMonth = (newMonth: string) => {
    setPickedDate({ month: newMonth, day: null, hour: null });
  };

  const setDay = (newDay: number) => {
    setPickedDate((prev) => ({ month: prev.month, day: newDay, hour: null }));
  };

  const setHour = (newHour: string) => {
    setPickedDate((prev) => ({
      month: prev.month,
      day: prev.day,
      hour: newHour,
    }));
  };

  const bookMeeting = () => {
    if (
      !pickedDate.month ||
      !pickedDate.hour ||
      typeof pickedDate.day !== "number"
    )
      return;
    const chosenDateStart = new Date(
      Number(pickedDate.month.split("-")[1]),
      Number(pickedDate.month.split("-")[0]),
      pickedDate.day,
      Number(pickedDate.hour.split(":")[0]),
      Number(pickedDate.hour.split(":")[1]),
      0,
    );
    const chosenDateEnd = addHours(chosenDateStart, 1);
    bookMeetingAction(() =>
      backendApi.user.bookMeeting({
        invitedUserId: coachId,
        start_time: chosenDateStart.toISOString(),
        end_time: chosenDateEnd.toISOString(),
      }),
    ).then(() => {
      console.log("bookMeetingAction success!");
      setSuccess(true);
      fetchData();
      // modalRef.current?.close();
      //display alert message, close modal
    });
  };

  const renderContent = () => {
    if (isSuccess)
      return (
        <div>
          <div className="text-green-500 flex items-center justify-center my-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="ml-4">Your session with coach has been booked!</p>
          </div>
        </div>
      );
    if (months && pickedDate.month)
      return (
        <>
          <MonthPickerCarousel
            activeMonth={pickedDate.month}
            months={Array.from(months)}
            setMonth={setMonth}
          />
          <div className="mt-6">
            <DayPickerCarousel
              activeMonth={pickedDate.month}
              activeDay={pickedDate.day}
              days={Array.from(
                days.get(Number(pickedDate.month.split("-")[0]))!,
              )}
              setDay={setDay}
            />
          </div>
          {pickedDate.day ? (
            <>
              <div className="divider"></div>
              <div>
                <HourPickerCarousel
                  activeMonth={pickedDate.month}
                  activeDay={pickedDate.day}
                  activeHour={pickedDate.hour}
                  hours={
                    hours.get(
                      `${pickedDate.month.split("-")[0]}-${pickedDate.day}`,
                    )!
                  }
                  setHour={setHour}
                />
              </div>
            </>
          ) : null}
          <button
            className={`btn btn-primary btn-block mt-8 ${
              isDatePicked ? "" : "btn-disabled"
            }`}
            onClick={bookMeeting}
          >
            Next step
          </button>
        </>
      );

    return <div>Loading</div>;
  };

  return (
    <>
      <button
        className="btn btn-primary mt-8 px-12"
        onClick={() => modalRef.current?.showModal()}
      >
        Book a session
      </button>
      <dialog id="book_session_modal" className="modal" ref={modalRef}>
        <div className="modal-box w-11/12 max-w-2xl py-8 px-6">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => {
              modalRef.current?.close();
              setSuccess(false);
            }}
          >
            ✕
          </button>
          {renderContent()}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            onClick={() => {
              setSuccess(false);
            }}
          >
            close
          </button>
        </form>
      </dialog>
    </>
  );
}

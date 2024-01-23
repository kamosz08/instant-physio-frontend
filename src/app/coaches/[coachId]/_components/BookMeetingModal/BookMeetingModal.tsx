"use client";

import { useRef, useState } from "react";
import { DayPickerCarousel } from "./DayPickerCarousel";
import { MonthPickerCarousel } from "./MonthPickerCarousel";
import { HourPickerCarousel } from "./HourPickerCarousel";
import { useAvailableDates } from "./useAvailableDates";
import { bookMeetingAction } from "@/domain-logic/authUser/bookMeeting";
import { backendApi } from "@/backendApi";
import { addHours } from "date-fns";
import { Error } from "./Error";
import { Success } from "./Success";
import { getDateFromState } from "./getDateDromState";
import { usePickedDateState } from "./usePickedDateState";

type FormStatus =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; errorMsg: string };

export function BookMeetingModal({ coachId }: { coachId: number }) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const { months, days, hours, fetchData } = useAvailableDates(coachId);
  const { pickedDate, setDay, setHour, setMonth, isDatePicked } =
    usePickedDateState(months);
  const [formStatus, setFormStatus] = useState<FormStatus>({ status: "idle" });

  const bookMeeting = () => {
    if (
      !pickedDate.month ||
      !pickedDate.hour ||
      typeof pickedDate.day !== "number"
    )
      return;

    const chosenDateStart = getDateFromState(
      pickedDate.month,
      pickedDate.day,
      pickedDate.hour,
    );
    const chosenDateEnd = addHours(chosenDateStart, 1);

    bookMeetingAction(() =>
      backendApi.user.bookMeeting({
        invitedUserId: coachId,
        start_time: chosenDateStart.toISOString(),
        end_time: chosenDateEnd.toISOString(),
      }),
    )
      .then(() => {
        setFormStatus({ status: "success" });
        fetchData();
      })
      .catch((err: Error) => {
        setFormStatus({ status: "error", errorMsg: err.message });
      });
  };

  const renderContent = () => {
    if (formStatus.status === "success") return <Success />;

    if (formStatus.status === "error")
      return <Error errorMsg={formStatus.errorMsg} />;

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
            Confirm
          </button>
        </>
      );

    return <div>Loading</div>;
  };

  return (
    <>
      <button
        className="btn btn-primary mt-8 px-12"
        onClick={() => {
          setFormStatus({ status: "idle" });
          modalRef.current?.showModal();
        }}
      >
        Book a session
      </button>
      <dialog id="book_session_modal" className="modal" ref={modalRef}>
        <div className="modal-box w-11/12 max-w-2xl py-8 px-6">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => {
              modalRef.current?.close();
            }}
          >
            ✕
          </button>
          {renderContent()}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

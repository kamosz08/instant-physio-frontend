"use client";

import { useRef } from "react";
import { DayPickerCarousel } from "./DayPickerCarousel";
import { MonthPickerCarousel } from "./MonthPickerCarousel";
import { HourPickerCarousel } from "./HourPickerCarousel";

export function BookMeetingModal() {
  const modalRef = useRef<HTMLDialogElement>(null);

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
            onClick={() => modalRef.current?.close()}
          >
            ✕
          </button>
          <MonthPickerCarousel />
          <div className="mt-6">
            <DayPickerCarousel />
          </div>
          <div className="divider"></div>
          <div>
            <HourPickerCarousel />
          </div>
          <button className="btn btn-primary btn-block mt-8">Next step</button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

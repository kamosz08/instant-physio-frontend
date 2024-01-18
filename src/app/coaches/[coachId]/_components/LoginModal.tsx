"use client";

import { useRef } from "react";
import { LoginForm } from "@/app/login/_components/LoginForm";
import { usePathname } from "next/navigation";

export function LoginModal() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  return (
    <>
      <button
        className="btn btn-primary mt-8 px-12"
        onClick={() => modalRef.current?.showModal()}
      >
        Sign In to book a session
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
          <div className="max-w-xs mx-auto">
            <LoginForm redirectPath={pathname} />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

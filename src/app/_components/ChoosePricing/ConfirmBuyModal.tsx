"use client";

import { useRef, useState } from "react";
import { backendApi } from "@/backendApi";
import { Error } from "./Error";
import { Success } from "./Success";
import { buyCreditsAction } from "@/domain-logic/authUser/buyCredits";
import { useSession } from "next-auth/react";

type FormStatus =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; errorMsg: string };

export function ConfirmBuyModal({ sessions }: { sessions: number }) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { update } = useSession();

  const [formStatus, setFormStatus] = useState<FormStatus>({ status: "idle" });

  const buyCredits = () => {
    buyCreditsAction(() =>
      backendApi.user.buyCredits({ credits: sessions * 10 }),
    )
      .then((res) => {
        setFormStatus({ status: "success" });
        update({ credits: res.credits });
      })
      .catch((err) => {
        setFormStatus({ status: "error", errorMsg: err.message });
      });
  };

  const renderContent = () => {
    if (formStatus.status === "success") return <Success />;

    if (formStatus.status === "error")
      return <Error errorMsg={formStatus.errorMsg} />;

    return (
      <>
        <p>Do you want to add {sessions * 10} credits to your account?</p>
        <div className="flex justify-end">
          <button className="btn btn-primary mt-8 mr-4" onClick={buyCredits}>
            Confirm
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <button
        className="btn btn-primary w-full mt-12 max-w-xs"
        onClick={() => {
          setFormStatus({ status: "idle" });
          modalRef.current?.showModal();
        }}
      >
        Choose Plan
      </button>
      <dialog id="book_session_modal" className="modal" ref={modalRef}>
        <div className="modal-box w-11/12 max-w-lg py-8 px-6">
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

"use client";

import { backendApi } from "@/backendApi";
import { cancelMeetingAction } from "@/domain-logic/authUser/cancelMeeting";
import { MySession } from "@/domain-logic/authUser/getMyUpcomingSessions";
import { isAfter } from "date-fns";

const isFuture = (dateStr: string) => {
  return isAfter(new Date(dateStr), new Date());
};

export function CancelMeetingButton({ session }: { session: MySession }) {
  const handleCancelMeeting = () => {
    cancelMeetingAction(() =>
      backendApi.user.cancelMeeting({ meetingId: session.id }),
    );
  };

  return (
    <button
      className="btn btn-error btn-sm btn-ghost text-red-500"
      disabled={
        !isFuture(session.date) ||
        session.status === "denied" ||
        session.status === "canceled"
      }
      onClick={handleCancelMeeting}
    >
      Cancel
    </button>
  );
}

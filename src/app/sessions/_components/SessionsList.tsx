import { backendApi } from "@/backendApi";
import { getMyUpcomingSessionsAction } from "@/domain-logic/authUser/getMyUpcomingSessions";
import { SessionCard } from "./SessionCard";
import { getMyHistorySessionsAction } from "@/domain-logic/authUser/getMyHistorySessions";

export async function SessionsList({ userId }: { userId: number }) {
  const myUpcomingSessions = await getMyUpcomingSessionsAction(() =>
    backendApi.user.getMyUpcomingSessions({ userId: userId }),
  );
  const myHistorySessions = await getMyHistorySessionsAction(() =>
    backendApi.user.getMyHistorySessions({ userId: userId }),
  );

  return (
    <div className="w-full flex max-w-5xl px-4">
      <div className="w-full">
        <h2 className="text-lg font-semibold">Upcoming sessions</h2>
        {myUpcomingSessions.length === 0 && (
          <p className="text-center">
            Looks like you don&apos;t have any session booked
          </p>
        )}
        {myUpcomingSessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}

        <h2 className="text-lg font-semibold mt-8">History sessions</h2>
        {myHistorySessions.length === 0 && (
          <p className="text-center">There is no history of sessions</p>
        )}
        {myHistorySessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}

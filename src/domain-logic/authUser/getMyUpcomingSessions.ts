export interface MySession {
  id: number;
  date: string;
  coach: { avatar: string | null; id: number; name: string };
  status: "invited" | "accepted" | "denied" | "canceled";
}

export async function getMyUpcomingSessionsAction(
  getMyUpcomingSessionsRequest: () => Promise<MySession[]>,
) {
  return await getMyUpcomingSessionsRequest();
}

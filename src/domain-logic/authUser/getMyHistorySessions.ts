import { MySession } from "./getMyUpcomingSessions";

export async function getMyHistorySessionsAction(
  getMyHistorySessionsRequest: () => Promise<MySession[]>,
) {
  return await getMyHistorySessionsRequest();
}

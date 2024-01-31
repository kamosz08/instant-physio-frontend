import { MySession } from "@/domain-logic/authUser/getMyUpcomingSessions";
import { User } from "@/domain-logic/user/login";
import { fetchClient } from "@/utils/fetch/fetchClient";

async function login(credentials: { username: string; password: string }) {
  const { body: tokenResponse, headers } = await fetchClient.post(
    "/api/v1/users/login",
    credentials,
  );

  const cookies = headers.getSetCookie();
  const refreshToken = cookies[0]
    .split(";")
    .find((s) => s.includes("refreshToken"))!
    .split("=")[1];

  const { body: userResponse } = await fetchClient.get("/api/v1/users/me", {
    Authorization: `Bearer ${tokenResponse.accessToken}`,
  });

  return {
    user: userResponse.data,
    accessToken: tokenResponse.accessToken,
    refreshToken: refreshToken,
    expireTime: tokenResponse.expireTime,
  } as {
    user: User;
    accessToken: string;
    expireTime: number;
    refreshToken: string;
  };
}

async function refreshToken({ refreshToken }: { refreshToken: string }) {
  const { body: tokenResponse, headers } = await fetchClient.post(
    "/api/v1/users/token",
    {
      refreshToken,
    },
  );

  const cookies = headers.getSetCookie();
  const newRefreshToken = cookies[0]
    .split(";")
    .find((s) => s.includes("refreshToken"))!
    .split("=")[1];

  return {
    accessToken: tokenResponse.accessToken,
    refreshToken: newRefreshToken,
    expireTime: tokenResponse.expireTime,
  } as {
    accessToken: string;
    expireTime: number;
    refreshToken: string;
  };
}

async function bookMeeting({
  start_time,
  end_time,
  invitedUserId,
}: {
  start_time: string;
  end_time: string;
  invitedUserId: number;
}) {
  await fetchClient.post(`/api/v1/meetings`, {
    start_time,
    end_time,
    invitedUserId,
  });
}

async function buyCredits({ credits }: { credits: number }) {
  const { body: response } = await fetchClient.post(
    `/api/v1/users/buyCredits`,
    {
      credits,
    },
  );

  return response?.data;
}

async function getMyUpcomingSessions({
  userId,
}: {
  userId: number;
}): Promise<MySession[]> {
  const { body } = await fetchClient.get(
    `/api/v1/users/${userId}/meetings/upcoming`,
  );

  const meetings = body.data as {
    id: number;
    status: "invited" | "accepted" | "denied";
    start_time: string;
    participants: { avatar: string | null; id: number; name: string }[];
  }[];

  return meetings.map((meeting) => ({
    id: meeting.id,
    status: meeting.status,
    date: meeting.start_time,
    coach: meeting.participants.find((p) => p.id !== userId)!,
  }));
}

async function getMyHistorySessions({
  userId,
}: {
  userId: number;
}): Promise<MySession[]> {
  const { body } = await fetchClient.get(
    `/api/v1/users/${userId}/meetings/history`,
  );

  const meetings = body.data as {
    id: number;
    status: "invited" | "accepted" | "denied";
    start_time: string;
    participants: { avatar: string | null; id: number; name: string }[];
  }[];

  return meetings.map((meeting) => ({
    id: meeting.id,
    status: meeting.status,
    date: meeting.start_time,
    coach: meeting.participants.find((p) => p.id !== userId)!,
  }));
}

export const userApi = {
  login,
  bookMeeting,
  buyCredits,
  refreshToken,
  getMyUpcomingSessions,
  getMyHistorySessions,
};

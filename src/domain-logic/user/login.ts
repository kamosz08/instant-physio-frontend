export interface User {
  id: number;
  username: string;
  name: string;
  type: "specialist" | "user" | "admin";
  status: "active" | "waiting_approval" | "denied" | "inactive";
  avatar: string | null;
  credits: number;
}

export async function loginAction(
  loginRequest: () => Promise<{
    user: User;
    accessToken: string;
    refreshToken: string;
    expireTime: number;
  }>,
) {
  const response = await loginRequest();

  return response;
}

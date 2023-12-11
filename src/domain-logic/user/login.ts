export interface User {
  id: number;
  username: string;
  name: string;
  type: "specialist" | "user" | "admin";
  status: "active" | "waiting_approval" | "denied" | "inactive";
  avatar: string | null;
}

export async function loginAction(
  loginRequest: () => Promise<{ user: User; token: string }>,
) {
  const token = await loginRequest();

  return token;
}

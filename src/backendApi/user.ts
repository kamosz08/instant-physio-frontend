import { User, loginAction } from "@/domain-logic/user/login";
import { fetchClient } from "@/utils/fetchClient";

async function login(credentials: { username: string; password: string }) {
  const getUser = async () => {
    const tokenResponse = await fetchClient.post(
      "/api/v1/users/login",
      credentials,
    );

    const userResponse = await fetchClient.get("/api/v1/users/me", {
      Authorization: `Bearer ${tokenResponse.token}`,
    });

    return { user: userResponse.data, token: tokenResponse.token };
  };

  const { user, token } = await loginAction(getUser);

  return { user, token } as { user: User; token: string };
}

export const usersApi = {
  login,
};

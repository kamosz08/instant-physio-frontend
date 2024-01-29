export async function refreshTokenAction(
  refreshTokenRequest: () => Promise<{
    accessToken: string;
    refreshToken: string;
    expireTime: number;
  }>,
) {
  const response = await refreshTokenRequest();

  return response;
}

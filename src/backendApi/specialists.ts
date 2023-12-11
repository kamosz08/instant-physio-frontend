import { Specialist } from "@/domain-logic/user/getSepcialists";
import { fetchClient } from "@/utils/fetchClient";

async function get(queryParameters: string | null) {
  const specialists = await fetchClient.get(
    `/api/v1/users/specialists${queryParameters ? "?" + queryParameters : ""}`,
  );

  return specialists.data as Specialist[];
}

export const specialistsApi = {
  get,
};

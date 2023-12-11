import { RichData } from "@/domain-logic/richDataType";
import { Specialist } from "@/domain-logic/user/getSepcialists";
import { fetchClient } from "@/utils/fetchClient";

async function get(queryParameters: string | null) {
  const specialists = await fetchClient.get(
    `/api/v1/users/specialists${queryParameters ? "?" + queryParameters : ""}`,
  );

  return specialists as RichData<Specialist>;
}

export const specialistApi = {
  get,
};

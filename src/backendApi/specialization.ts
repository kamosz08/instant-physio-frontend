import { Specialization } from "@/domain-logic/user/getSpecializations";
import { fetchClient } from "@/utils/fetchClient";

async function get() {
  const specializationResponse = await fetchClient.get(
    `/api/v1/specializations`,
  );

  return specializationResponse.data as Specialization[];
}

export const specializationApi = {
  get,
};

import { SpecializationDetails } from "@/domain-logic/user/getSpecializationDetails";
import { Specialization } from "@/domain-logic/user/getSpecializations";
import { fetchClient } from "@/utils/fetch/fetchClient";

async function getAll() {
  const { body: specializationsResponse } = await fetchClient.get(
    `/api/v1/specializations`,
  );

  return specializationsResponse.data as Specialization[];
}

async function get({ specializationSlug }: { specializationSlug: string }) {
  const { body: specializationResponse } = await fetchClient.get(
    `/api/v1/specializations/${specializationSlug}`,
  );

  return specializationResponse.data as SpecializationDetails;
}

export const specializationApi = {
  getAll,
  get,
};

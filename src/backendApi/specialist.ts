import { RichData } from "@/domain-logic/richDataType";
import { Specialist } from "@/domain-logic/user/getSepcialists";
import { SpecialistDetails } from "@/domain-logic/user/getSpecialistDetails";
import { fetchClient } from "@/utils/fetchClient";

async function getAll(queryParameters: string | null) {
  const specialists = await fetchClient.get(
    `/api/v1/users/specialists${queryParameters ? "?" + queryParameters : ""}`,
  );

  return specialists as RichData<Specialist>;
}

async function get({ specialistId }: { specialistId: number }) {
  const specializationResponse = await fetchClient.get(
    `/api/v1/users/specialists/${specialistId}`,
  );

  return specializationResponse.data as Omit<
    SpecialistDetails,
    "specializations"
  >;
}

async function getUserSpecializations({
  specialistId,
}: {
  specialistId: number;
}) {
  const specializationResponse = await fetchClient.get(
    `/api/v1/users/${specialistId}/specializations`,
  );

  return specializationResponse.data as SpecialistDetails["specializations"];
}

async function getSpecialistDetails({
  specialistId,
}: {
  specialistId: number;
}) {
  const [specialist, specializations] = await Promise.all([
    get({ specialistId }),
    getUserSpecializations({ specialistId }),
  ]);

  return { ...specialist, specializations };
}

export const specialistApi = {
  getAll,
  getSpecialistDetails,
};

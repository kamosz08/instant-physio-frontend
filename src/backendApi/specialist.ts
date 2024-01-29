import { RichData } from "@/domain-logic/richDataType";
import { Specialist } from "@/domain-logic/user/getSepcialists";
import { SpecialistDetails } from "@/domain-logic/user/getSpecialistDetails";
import { fetchClient } from "@/utils/fetch/fetchClient";

async function getAll(queryParameters: string | null) {
  const { body: specialists } = await fetchClient.get(
    `/api/v1/users/specialists${queryParameters ? "?" + queryParameters : ""}`,
  );

  return specialists as RichData<Specialist>;
}

async function get({ specialistId }: { specialistId: number }) {
  const { body: specializationResponse } = await fetchClient.get(
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
  const { body: specializationResponse } = await fetchClient.get(
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

async function getSpecialistAvailableHours({
  specialistId,
}: {
  specialistId: number;
}) {
  const { body: availableHoursResponse } = await fetchClient.get(
    `/api/v1/users/${specialistId}/availableHours`,
  );

  return availableHoursResponse.data as string[];
}

export const specialistApi = {
  getAll,
  getSpecialistDetails,
  getSpecialistAvailableHours,
};

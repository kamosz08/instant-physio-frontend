import { specialistApi } from "./specialist";
import { specializationApi } from "./specialization";
import { userApi } from "./user";

export const backendApi = {
  specialization: specializationApi,
  specialist: specialistApi,
  user: userApi,
};

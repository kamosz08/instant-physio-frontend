import { Specialization } from "./getSpecializations";

export interface SpecialistDetails {
  id: number;
  name: string;
  username: string;
  avatar: string;
  gender: "male" | "female";
  description: string;
  specializations: { id: number; name: string; slug: string }[];
}

export async function getSpecialistDetailsAction(
  getSpecialistRequest: () => Promise<SpecialistDetails>,
) {
  const specialist = await getSpecialistRequest();

  return specialist;
}

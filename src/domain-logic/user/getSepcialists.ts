import { RichData } from "../richDataType";

export interface Specialist {
  id: number;
  name: string;
  username: string;
  avatar: string;
  gender: "male" | "female";
  description: string;
}

export async function getSpecialistsAction(
  getSpecialistsRequest: () => Promise<RichData<Specialist>>,
) {
  const specialists = await getSpecialistsRequest();

  return specialists;
}

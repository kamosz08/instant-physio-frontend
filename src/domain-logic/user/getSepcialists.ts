export interface Specialist {
  name: string;
  username: string;
  avatar: string;
  gender: "male" | "female";
  description: string;
}

export async function getSpecialistsAction(
  getSpecialistsRequest: () => Promise<Specialist[]>,
) {
  const specialists = await getSpecialistsRequest();

  return specialists;
}

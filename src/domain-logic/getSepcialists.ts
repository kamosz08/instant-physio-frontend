export interface Specialist {
  name: string;
  username: string;
  avatar: string;
  gender: "male" | "female";
  description: string;
}

export async function getSpecialists(getter: () => Promise<Specialist[]>) {
  const specialists = await getter();

  return specialists;
}

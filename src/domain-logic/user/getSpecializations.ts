export interface Specialization {
  id: number;
  name: string;
  description: string;
}

export async function getSpecializationsAction(
  getSpecializationsRequest: () => Promise<Specialization[]>,
) {
  const specializations = await getSpecializationsRequest();

  return specializations;
}

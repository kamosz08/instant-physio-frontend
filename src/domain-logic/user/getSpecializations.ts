export interface Specialization {
  id: number;
  name: string;
  slug: string;
}

export async function getSpecializationsAction(
  getSpecializationsRequest: () => Promise<Specialization[]>,
) {
  const specializations = await getSpecializationsRequest();

  return specializations;
}

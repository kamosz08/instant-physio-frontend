export interface SpecializationDetails {
  id: number;
  name: string;
  slug: string;
  description: string;
  benefits: string;
  benefitsPhoto: string;
  mainPhoto: string;
}

export async function getSpecializationDetailsAction(
  getSpecializationRequest: () => Promise<SpecializationDetails>,
) {
  const specialization = await getSpecializationRequest();

  return specialization;
}

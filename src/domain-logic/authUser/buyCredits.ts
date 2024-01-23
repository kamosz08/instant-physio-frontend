export async function buyCreditsAction(
  buyCreditsRequest: () => Promise<{ credits: number }>,
) {
  return await buyCreditsRequest();
}

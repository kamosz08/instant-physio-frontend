export async function getAvailableDatesAction(
  getAvailableDatesRequest: () => Promise<string[]>,
) {
  const availableDates = await getAvailableDatesRequest();

  return availableDates;
}

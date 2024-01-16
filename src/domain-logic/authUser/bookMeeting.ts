export async function bookMeetingAction(
  bookMeetingRequest: () => Promise<void>,
) {
  await bookMeetingRequest();
}

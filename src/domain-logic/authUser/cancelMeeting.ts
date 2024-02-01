export async function cancelMeetingAction(
  cancelMeetingRequest: () => Promise<void>,
) {
  await cancelMeetingRequest();
}

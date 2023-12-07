export const waitFor = async (timeMs: number) =>
  new Promise((resolve) => setTimeout(resolve, timeMs));

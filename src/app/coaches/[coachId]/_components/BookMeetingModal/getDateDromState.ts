export const getDateFromState = (
  monthState: string, //2-2020
  dayState: number,
  hourState: string, //16:30
) => {
  return new Date(
    Number(monthState.split("-")[1]),
    Number(monthState.split("-")[0]),
    dayState,
    Number(hourState.split(":")[0]),
    Number(hourState.split(":")[1]),
    0,
  );
};

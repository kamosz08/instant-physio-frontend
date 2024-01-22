import { useEffect, useState } from "react";

export const usePickedDateState = (months: Set<string>) => {
  const [pickedDate, setPickedDate] = useState<{
    month: string | null;
    day: number | null;
    hour: string | null;
  }>({ month: null, day: null, hour: null });

  useEffect(() => {
    if (months) {
      setPickedDate({ month: Array.from(months)[0], day: null, hour: null });
    }
  }, [months]);

  const isDatePicked =
    pickedDate.month && typeof pickedDate.day === "number" && pickedDate.hour;

  const setMonth = (newMonth: string) => {
    setPickedDate({ month: newMonth, day: null, hour: null });
  };

  const setDay = (newDay: number) => {
    setPickedDate((prev) => ({ month: prev.month, day: newDay, hour: null }));
  };

  const setHour = (newHour: string) => {
    setPickedDate((prev) => ({
      month: prev.month,
      day: prev.day,
      hour: newHour,
    }));
  };

  return {
    pickedDate,
    setHour,
    setDay,
    setMonth,
    isDatePicked,
  };
};

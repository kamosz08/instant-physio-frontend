import { useCallback, useEffect, useMemo, useState } from "react";
import { getAvailableDatesAction } from "@/domain-logic/user/getAvailableDates";
import { backendApi } from "@/backendApi";

export const useAvailableDates = (coachId: number) => {
  const [availableDatesResponse, setAvailableDates] = useState<string[]>([]);
  const availableDates = useMemo(
    () => availableDatesResponse.map((dateString) => new Date(dateString)),
    [availableDatesResponse],
  );

  const months = useMemo(
    () =>
      availableDates.reduce((acc, currentValue) => {
        const year = currentValue.getFullYear();
        const month = currentValue.getMonth();

        acc.add(`${month}-${year}`);
        return acc;
      }, new Set<string>()),
    [availableDates],
  );

  const days = useMemo(
    () =>
      availableDates.reduce((acc, currentValue) => {
        const month = currentValue.getMonth();
        const day = currentValue.getDate();

        const existingValues = acc.get(month);
        if (existingValues) {
          existingValues.add(day);
        } else {
          acc.set(month, new Set([day]));
        }

        return acc;
      }, new Map<number, Set<number>>()),
    [availableDates],
  );

  const hours = useMemo(
    () =>
      availableDates.reduce((acc, currentValue) => {
        const month = currentValue.getMonth();
        const day = currentValue.getDate();

        const existingValues = acc.get(`${month}-${day}`);
        if (existingValues) {
          existingValues.push(
            `${currentValue.getHours()}:${currentValue.getMinutes()}`,
          );
        } else {
          acc.set(`${month}-${day}`, [
            `${currentValue.getHours()}:${currentValue.getMinutes()}`,
          ]);
        }

        return acc;
      }, new Map<string, Array<string>>()),
    [availableDates],
  );

  const fetchData = useCallback(() => {
    getAvailableDatesAction(() =>
      backendApi.specialist.getSpecialistAvailableHours({
        specialistId: coachId,
      }),
    ).then((data) => {
      setAvailableDates(data);
    });
  }, [coachId]);

  const result = useMemo(
    () => ({
      months,
      days,
      hours,
      fetchData,
    }),
    [months, days, hours, fetchData],
  );

  useEffect(() => {
    fetchData();
  }, []);

  return result;
};

import queryString from "query-string";

export function calculateSearchQuery(
  currentSearchQuery: string,
  filterKey: "specialization" | "gender",
  filterValueToToggle: string,
): string | null {
  const parsedQuery = queryString.parse(currentSearchQuery);
  let parsedFilter = parsedQuery[filterKey];

  switch (filterKey) {
    case "gender":
    case "specialization": {
      if (!parsedFilter) {
        parsedFilter = filterValueToToggle;
        parsedQuery[filterKey] = parsedFilter;
        return queryString.stringify(parsedQuery);
      }
      if (parsedFilter && typeof parsedFilter === "string") {
        const currentValues = parsedFilter.split(",");

        const isInCurrentQuery = currentValues.includes(filterValueToToggle);
        const isTheOnlyValue = currentValues.length === 1;

        if (isInCurrentQuery && !isTheOnlyValue) {
          parsedFilter = currentValues
            .join(",")
            .replace(`${filterValueToToggle},`, "")
            .replace(`,${filterValueToToggle}`, "");

          parsedQuery[filterKey] = parsedFilter;
          return queryString.stringify(parsedQuery);
        }

        if (isInCurrentQuery && isTheOnlyValue) {
          delete parsedQuery[filterKey];
          return queryString.stringify(parsedQuery);
        }

        if (!isInCurrentQuery) {
          parsedFilter = [...currentValues, filterValueToToggle].join(",");
          parsedQuery[filterKey] = parsedFilter;
          return queryString.stringify(parsedQuery);
        }
      }

      return null;
    }

    default:
      console.error("Unhandled filter value");
      return null;
  }
}

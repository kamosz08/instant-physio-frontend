import queryString from "query-string";

export function calculateSearchQuery(
  currentSearchQuery: string,
  filterKey: "specialization" | "gender" | "search",
  filterValue: string,
): string | null {
  const parsedQuery = queryString.parse(currentSearchQuery);
  let parsedFilter = parsedQuery[filterKey];

  switch (filterKey) {
    case "gender":
    case "specialization": {
      if (!parsedFilter) {
        parsedFilter = filterValue;
        parsedQuery[filterKey] = parsedFilter;
        return queryString.stringify(parsedQuery);
      }
      if (parsedFilter && typeof parsedFilter === "string") {
        const currentValues = parsedFilter.split(",");

        const isInCurrentQuery = currentValues.includes(filterValue);
        const isTheOnlyValue = currentValues.length === 1;

        if (isInCurrentQuery && !isTheOnlyValue) {
          parsedFilter = currentValues
            .join(",")
            .replace(`${filterValue},`, "")
            .replace(`,${filterValue}`, "");

          parsedQuery[filterKey] = parsedFilter;
          return queryString.stringify(parsedQuery);
        }

        if (isInCurrentQuery && isTheOnlyValue) {
          delete parsedQuery[filterKey];
          return queryString.stringify(parsedQuery);
        }

        if (!isInCurrentQuery) {
          parsedFilter = [...currentValues, filterValue].join(",");
          parsedQuery[filterKey] = parsedFilter;
          return queryString.stringify(parsedQuery);
        }
      }

      return null;
    }

    case "search": {
      if (filterValue) {
        parsedFilter = filterValue;
        parsedQuery[filterKey] = parsedFilter;
        return queryString.stringify(parsedQuery);
      }
      if (parsedFilter && !filterValue) {
        delete parsedQuery[filterKey];
        return queryString.stringify(parsedQuery);
      }
      return null;
    }

    default:
      console.error("Unhandled filter value");
      return null;
  }
}

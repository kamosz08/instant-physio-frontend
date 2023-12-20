import queryString from "query-string";

type Filter =
  | {
      key: "specialization" | "gender" | "search";
      value: string;
    }
  | {
      key: "available";
      value: { from: string; to: string };
    };

export function calculateSearchQuery(
  currentSearchQuery: string,
  filter: Filter,
): string | null {
  const parsedQuery = queryString.parse(currentSearchQuery);
  let parsedFilter = parsedQuery[filter.key];

  switch (filter.key) {
    case "gender":
    case "specialization": {
      if (!parsedFilter) {
        parsedFilter = filter.value;
        parsedQuery[filter.key] = parsedFilter;
        return queryString.stringify(parsedQuery);
      }
      if (parsedFilter && typeof parsedFilter === "string") {
        const currentValues = parsedFilter.split(",");

        const isInCurrentQuery = currentValues.includes(filter.value);
        const isTheOnlyValue = currentValues.length === 1;

        if (isInCurrentQuery && !isTheOnlyValue) {
          parsedFilter = currentValues
            .join(",")
            .replace(`${filter.value},`, "")
            .replace(`,${filter.value}`, "");

          parsedQuery[filter.key] = parsedFilter;
          return queryString.stringify(parsedQuery);
        }

        if (isInCurrentQuery && isTheOnlyValue) {
          delete parsedQuery[filter.key];
          return queryString.stringify(parsedQuery);
        }

        if (!isInCurrentQuery) {
          parsedFilter = [...currentValues, filter.value].join(",");
          parsedQuery[filter.key] = parsedFilter;
          return queryString.stringify(parsedQuery);
        }
      }

      return null;
    }

    case "search": {
      if (filter.value) {
        parsedFilter = filter.value;
        parsedQuery[filter.key] = parsedFilter;
        return queryString.stringify(parsedQuery);
      }
      if (parsedFilter && !filter.value) {
        delete parsedQuery[filter.key];
        return queryString.stringify(parsedQuery);
      }
      return null;
    }

    case "available": {
      if (filter.value.from && filter.value.to) {
        parsedQuery[`available[from]`] = filter.value.from;
        parsedQuery[`available[to]`] = filter.value.to;
        return queryString.stringify(parsedQuery);
      }
      if (
        parsedQuery["available[from]"] &&
        parsedQuery["available[to]"] &&
        !filter.value.from &&
        !filter.value.to
      ) {
        delete parsedQuery["available[from]"];
        delete parsedQuery["available[to]"];
        return queryString.stringify(parsedQuery);
      }
      return null;
    }

    default:
      console.error("Unhandled filter value");
      return null;
  }
}

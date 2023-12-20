"use client";

import { calculateSearchQuery } from "@/utils/calculateSearchQuery";
import debounce from "lodash.debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useCallback, useState } from "react";

export function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [serachValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );

  const debouncedSearch = useCallback(
    debounce((newSearch) => {
      const newSearchQuery = calculateSearchQuery(searchParams.toString(), {
        key: "search",
        value: newSearch,
      });

      router.push(`${pathname}?${newSearchQuery}`);
    }, 700),
    [],
  );

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="">
      <input
        placeholder="Search by name or description"
        type="text"
        className="input input-bordered input-primary w-full"
        onChange={handleSearch}
        value={serachValue}
      />
    </div>
  );
}

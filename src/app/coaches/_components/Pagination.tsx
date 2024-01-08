"use client";

import { calculateSearchQuery } from "@/utils/calculateSearchQuery";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function Pagination({ isLast }: { isLast: boolean }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const goToNextPage = () => {
    const newSearchQuery = calculateSearchQuery(searchParams.toString(), {
      key: "page",
      value: String(currentPage + 1),
    });

    router.push(`${pathname}?${newSearchQuery}`);
  };

  const goToPrevPage = () => {
    const newSearchQuery = calculateSearchQuery(searchParams.toString(), {
      key: "page",
      value: String(currentPage - 1),
    });

    router.push(`${pathname}?${newSearchQuery}`);
  };

  return (
    <div className="join">
      <button
        className={`join-item btn ${currentPage <= 1 ? "btn-disabled" : ""}`}
        onClick={goToPrevPage}
      >
        «
      </button>
      <div className="join-item flex items-center justify-center px-5">
        Page {currentPage}
      </div>
      <button
        className={`join-item btn ${isLast ? "btn-disabled" : ""}`}
        onClick={goToNextPage}
      >
        »
      </button>
    </div>
  );
}

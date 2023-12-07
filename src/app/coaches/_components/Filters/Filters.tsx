import Link from "next/link";
import { CategoryFilter } from "./CategoryFilter";
import { GenderFilter } from "./GenderFilter";

export function Filters() {
  return (
    <div className="mr-8 relative pb-10">
      <CategoryFilter />
      <GenderFilter />
      <Link
        href={"/coaches"}
        className="btn btn-ghost btn-xs uppercase absolute left-0 bottom-0"
      >
        Clear
      </Link>
    </div>
  );
}

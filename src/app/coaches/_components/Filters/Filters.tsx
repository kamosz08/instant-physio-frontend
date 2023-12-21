import Link from "next/link";
import { CategoryFilter } from "./CategoryFilter";
import { GenderFilter } from "./GenderFilter";
import { Specialization } from "@/domain-logic/user/getSpecializations";
import { AvailabilityFilter } from "./AvailabilityFilter";

export function Filters({ categories }: { categories: Specialization[] }) {
  return (
    <div className="mr-8 relative pb-16">
      <CategoryFilter categories={categories} />
      <div className="mt-8">
        <GenderFilter />
      </div>
      <div className="mt-8">
        <AvailabilityFilter />
      </div>
      <Link
        href={"/coaches"}
        className="btn btn-ghost btn-xs uppercase absolute left-0 bottom-0"
      >
        Clear
      </Link>
    </div>
  );
}

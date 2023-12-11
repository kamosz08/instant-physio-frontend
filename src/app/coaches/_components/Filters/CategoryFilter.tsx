"use client";

import { Specialization } from "@/domain-logic/user/getSpecializations";
import { calculateSearchQuery } from "@/utils/calculateSearchQuery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function CategoryFilter({
  categories,
}: {
  categories: Specialization[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategories = searchParams.get("specialization")
    ? searchParams
        .get("specialization")!
        .split(",")
        .map((c) => +c)
    : [];

  const isChecked = (categoryId: number) => {
    return currentCategories.includes(categoryId);
  };

  const toggleCategory = (categoryId: number) => () => {
    const newSearchQuery = calculateSearchQuery(
      searchParams.toString(),
      "specialization",
      categoryId.toString(),
    );

    router.push(`${pathname}?${newSearchQuery}`);
  };

  return (
    <div className="categories">
      <p className="text-lg font-semibold mb-4">Categories</p>
      {categories.map((category) => (
        <div className="form-control" key={category.id}>
          <label className="label cursor-pointer justify-start">
            <input
              type="checkbox"
              checked={isChecked(category.id)}
              onChange={toggleCategory(category.id)}
              className="checkbox checkbox-primary mr-2"
            />
            <span className="label-text">{category.name}</span>
          </label>
        </div>
      ))}
    </div>
  );
}

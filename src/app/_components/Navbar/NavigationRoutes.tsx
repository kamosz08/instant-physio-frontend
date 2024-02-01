"use client";
import { Specialization } from "@/domain-logic/user/getSpecializations";
import { useCloseDropdownOnClickOutside } from "@/utils/useCloseDropdownOnClickOutside";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export function NavigationRoutes({
  categories,
}: {
  categories: Specialization[];
}) {
  const pathname = usePathname();
  const ref = useRef<HTMLDetailsElement>(null);
  useCloseDropdownOnClickOutside(ref);

  const handleSubmenuItemClick = () => {
    ref.current!.open = false;
  };

  return (
    <>
      <li className={pathname === "/" ? "px-4 text-primary" : "px-4"}>
        <Link
          className="active:!text-primary active:!bg-transparent focus:!text-primary focus:!bg-transparent"
          href={"/"}
        >
          Home
        </Link>
      </li>
      <li className="px-4">
        <details ref={ref}>
          <summary>Categories</summary>
          <ul className="p-2">
            {categories.map((category) => (
              <li
                className={
                  decodeURI(pathname) === `/categories/${category.slug}`
                    ? "text-primary"
                    : ""
                }
                key={category.id}
                onClick={handleSubmenuItemClick}
              >
                <Link
                  className="active:!text-primary active:!bg-transparent focus:!text-primary focus:!bg-transparent"
                  href={`/categories/${category.slug}`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </li>
      <li className={pathname === "/coaches" ? "px-4 text-primary" : "px-4"}>
        <Link
          className="active:!text-primary active:!bg-transparent focus:!text-primary focus:!bg-transparent"
          href={"/coaches"}
        >
          Coaches
        </Link>
      </li>
    </>
  );
}
